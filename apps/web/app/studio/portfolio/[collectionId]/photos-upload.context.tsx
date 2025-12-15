'use client';

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import { UploadResult } from '@/application/use-cases/portfolio';
import { Photo } from '@/entities/models/photo';
import { uploadFileViaXhr } from '@/utils/files/upload-file';

import { preparePhotoUploadAction } from './use-cases/upload-photos/actions';

export type ActiveUpload = {
  uploadId: string;
  file: File;
  status: 'idle' | 'uploading' | 'completed' | 'failed';
  progress: number;
  result?: UploadResult;
};

const PhotosUploadContext = createContext<{
  uploads: ActiveUpload[];
  setUploads: (uploads: ActiveUpload[]) => void;
  isBatchLoading: boolean;
  uploadPhotos: (files: File[]) => Promise<void>;
  timeLeft: number | null;
}>({
  isBatchLoading: false,
  uploads: [],
  setUploads: () => {},
  uploadPhotos: async () => {},
  timeLeft: null,
});

type PhotosUploadProviderProps = {
  userId: string;
  collectionId: string;
  children: React.ReactNode;
  existingPhotos: Photo[];
};

export const PhotosUploadProvider = (props: PhotosUploadProviderProps) => {
  const { userId, collectionId, children } = props;

  const [uploads, setUploads] = useState<ActiveUpload[]>([]);
  const [isBatchLoading, startBatchLoadingTransition] = useTransition();
  const [loadedBytesMap, setLoadedBytesMap] = useState<Record<number, number>>(
    {},
  );

  const batchStartTimeRef = useRef<number>(0);

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
    if (!isBatchLoading || totalUploadedBytes === 0) return null;

    const timeElapsed = (Date.now() - batchStartTimeRef.current) / 1000; // Seconds
    const globalSpeed = totalUploadedBytes / timeElapsed; // Bytes per second

    const remainingBytes = totalBatchSize - totalUploadedBytes;

    if (globalSpeed <= 0) return null;

    return remainingBytes / globalSpeed; // Seconds remaining
  };

  const timeLeft = calculateTimeLeft();

  const uploadPhotos = async (files: File[]) => {
    batchStartTimeRef.current = Date.now();

    const queueItems: ActiveUpload[] = files.map((file) => ({
      file,
      uploadId: crypto.randomUUID(),
      status: 'idle',
      progress: 0,
    }));

    setUploads((prevUploads) => [...prevUploads, ...queueItems]);

    startBatchLoadingTransition(async () => {
      for (const item of queueItems) {
        updateUpload(item.uploadId, { status: 'uploading' });

        try {
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

          updateUpload(item.uploadId, {
            status: 'completed',
            progress: 100,
          });

          // TODO: confirm upload, show photo in ui (if needed beyond status)
        } catch (error) {
          console.error(`Failed to upload ${item.file.name}:`, error);
          updateUpload(item.uploadId, { status: 'failed' });

          // Optional: If you want to stop remaining uploads on error, add `break;` here.
          // Currently, it continues to try the next file.
        }
      }
    });
  };

  return (
    <PhotosUploadContext.Provider
      value={{
        uploads,
        setUploads,
        uploadPhotos,
        isBatchLoading,
        timeLeft,
      }}
    >
      {children}
    </PhotosUploadContext.Provider>
  );
};

export const usePhotosUpload = () => {
  return useContext(PhotosUploadContext);
};
