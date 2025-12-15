'use client';

import { createContext, useContext, useState, useTransition } from 'react';

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
}>({
  isBatchLoading: false,
  uploads: [],
  setUploads: () => {},
  uploadPhotos: async () => {},
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

  const updateUpload = (id: string, patch: Partial<ActiveUpload>) => {
    setUploads((prev) =>
      prev.map((u) => (u.uploadId === id ? { ...u, ...patch } : u)),
    );
  };

  const uploadPhotos = async (files: File[]) => {
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
            (progress) => {
              updateUpload(item.uploadId, {
                progress,
                status: progress === 100 ? 'completed' : 'uploading',
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
      }}
    >
      {children}
    </PhotosUploadContext.Provider>
  );
};

export const usePhotosUpload = () => {
  return useContext(PhotosUploadContext);
};
