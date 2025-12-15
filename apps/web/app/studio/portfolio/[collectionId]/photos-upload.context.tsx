'use client';

import { createContext, useContext, useState, useTransition } from 'react';

import { BatchUploadResult } from '@/application/use-cases/portfolio/initiate-photos-batch-upload.use-case';
import { Photo } from '@/entities/models/photo';
import { uploadFileViaXhr } from '@/utils/files/upload-file';

import { initiatePhotosBatchUploadAction } from './use-cases/upload-photos/actions';

export type ActiveUpload = {
  uploadId: string;
  file: File;
  status: 'idle' | 'uploading' | 'completed' | 'failed';
  progress: number;
  result?: BatchUploadResult;
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
    // 1. Initialize local state immediately
    const newUploads: ActiveUpload[] = files.map((file) => ({
      file,
      uploadId: crypto.randomUUID(),
      status: 'idle',
      progress: 0,
    }));

    setUploads(newUploads);

    // 2. Prepare payload for server
    const batchInput = newUploads.map((u) => ({
      originalFilename: u.file.name,
      format: u.file.type,
      sizeInBytes: u.file.size,
      uploadId: u.uploadId,
    }));

    startBatchLoadingTransition(async () => {
      // TODO: don't do batch, because we need to check upload storage quota
      const responseMap = await initiatePhotosBatchUploadAction(
        userId,
        collectionId,
        batchInput,
      );

      // 3. Process uploads
      for (const upload of newUploads) {
        const serverData = responseMap.get(upload.uploadId);

        if (!serverData) {
          updateUpload(upload.uploadId, { status: 'failed' });
          continue;
        }

        // Attach server data and start XHR
        updateUpload(upload.uploadId, {
          status: 'uploading',
          result: serverData,
        });

        try {
          if (!serverData.uploadUrl) {
            throw new Error('Upload URL not found');
          }

          await uploadFileViaXhr(
            serverData.uploadUrl,
            upload.file,
            (progress) => {
              updateUpload(upload.uploadId, {
                progress,
                status: progress === 100 ? 'completed' : 'uploading',
              });
            },
          );

          updateUpload(upload.uploadId, { status: 'completed', progress: 100 });
          // TODO: confirm upload, show photo in ui
        } catch (error) {
          console.error(`Upload failed for ${upload.file.name}:`, error);
          updateUpload(upload.uploadId, { status: 'failed' });
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
