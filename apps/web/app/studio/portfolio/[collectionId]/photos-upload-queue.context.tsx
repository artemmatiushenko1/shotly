'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { UploadResult } from '@/application/use-cases/portfolio';
import { NotEnoughStorageError } from '@/entities/errors/storage';
import { uploadFileViaXhr } from '@/utils/files/upload-file';

import {
  confirmPhotoUploadAction,
  preparePhotoUploadAction,
} from './use-cases/upload-photos/actions';

export type ActiveUpload = {
  uploadId: string;
  file: File;
  status: 'idle' | 'uploading' | 'completed' | 'failed';
  progress: number;
  result?: UploadResult;
  errorMessage?: string;
};

type PhotosUploadQueueContextType = {
  uploads: ActiveUpload[];
  setUploads: (uploads: ActiveUpload[]) => void;
  uploadPhotos: (files: File[]) => Promise<void>;
  timeLeft: number | null;
  isLoading: boolean;
};

const PhotosUploadQueueContext = createContext<PhotosUploadQueueContextType>({
  uploads: [],
  setUploads: () => {},
  uploadPhotos: async () => {},
  timeLeft: null,
  isLoading: false,
});

type PhotosUploadQueueProviderProps = {
  userId: string;
  collectionId: string;
  children: React.ReactNode;
};

export const PhotosUploadQueueProvider = (
  props: PhotosUploadQueueProviderProps,
) => {
  const { userId, collectionId, children } = props;

  const [uploads, setUploads] = useState<ActiveUpload[]>([]);
  const [loadedBytesMap, setLoadedBytesMap] = useState<Record<number, number>>(
    {},
  );
  const batchStartTimeRef = useRef<number>(0);

  const isLoading = useMemo(
    () => uploads.some((u) => u.status === 'uploading' || u.status === 'idle'),
    [uploads],
  );

  const updateUpload = (id: string, patch: Partial<ActiveUpload>) => {
    setUploads((prev) =>
      prev.map((u) => (u.uploadId === id ? { ...u, ...patch } : u)),
    );
  };

  const totalBatchSize = useMemo(
    () => uploads.reduce((acc, upload) => acc + upload.file.size, 0),
    [uploads],
  );

  const totalUploadedBytes = Object.values(loadedBytesMap).reduce(
    (acc, bytes) => acc + bytes,
    0,
  );

  // TODO: move remaining time calculation to a separate hook
  const calculateTimeLeft = () => {
    if (!isLoading || totalUploadedBytes === 0) return null;

    const timeElapsed = (Date.now() - batchStartTimeRef.current) / 1000; // Seconds
    const globalSpeed = totalUploadedBytes / timeElapsed; // Bytes per second

    const remainingBytes = totalBatchSize - totalUploadedBytes;

    if (globalSpeed <= 0) return null;

    return remainingBytes / globalSpeed; // Seconds remaining
  };

  const timeLeft = calculateTimeLeft();

  const processUpload = useCallback(
    async (item: ActiveUpload) => {
      try {
        updateUpload(item.uploadId, { status: 'uploading' });

        const serverData = await preparePhotoUploadAction(
          userId,
          collectionId,
          {
            originalFilename: item.file.name,
            format: item.file.type,
            sizeInBytes: item.file.size,
          },
        );

        updateUpload(item.uploadId, {
          status: 'uploading',
          result: serverData,
        });

        await uploadFileViaXhr(
          serverData.uploadUrl,
          item.file,
          (uploadedBytes, totalFileBytes) => {
            setLoadedBytesMap((prev) => ({
              ...prev,
              [item.uploadId]: uploadedBytes,
            }));

            const progressPercent = Math.round(
              (uploadedBytes / totalFileBytes) * 100,
            );

            updateUpload(item.uploadId, {
              progress: progressPercent,
              status: progressPercent === 100 ? 'completed' : 'uploading',
            });
          },
        );

        await confirmPhotoUploadAction(
          userId,
          serverData.photo.id,
          collectionId,
        );

        updateUpload(item.uploadId, {
          status: 'completed',
          progress: 100,
        });

        // TODO: confirm upload, show photo in ui (if needed beyond status)
      } catch (error) {
        if (
          error instanceof Error &&
          'digest' in error &&
          error.digest === NotEnoughStorageError.DIGEST
        ) {
          updateUpload(item.uploadId, {
            status: 'failed',
            errorMessage: 'Not enough storage',
          });
        } else {
          updateUpload(item.uploadId, { status: 'failed' });
        }

        // Optional: If you want to stop remaining uploads on error, add `break;` here.
        // Currently, it continues to try the next file.
      }
    },
    [userId, collectionId],
  );

  const uploadPhotos = async (files: File[]) => {
    if (!batchStartTimeRef.current) {
      batchStartTimeRef.current = Date.now();
    }

    const queueItems: ActiveUpload[] = files.map((file) => ({
      file,
      uploadId: crypto.randomUUID(),
      status: 'idle',
      progress: 0,
    }));

    setUploads((prevUploads) => [...prevUploads, ...queueItems]);
  };

  useEffect(() => {
    const isBusy = uploads.some((u) => u.status === 'uploading');

    if (isBusy) return;

    const nextFile = uploads.find((u) => u.status === 'idle');

    if (nextFile) {
      processUpload(nextFile);
    }
  }, [uploads, processUpload]);

  return (
    <PhotosUploadQueueContext.Provider
      value={{
        uploads,
        setUploads,
        uploadPhotos,
        isLoading,
        timeLeft,
      }}
    >
      {children}
    </PhotosUploadQueueContext.Provider>
  );
};

export const usePhotosUploadQueue = () => {
  return useContext(PhotosUploadQueueContext);
};
