'use client';

import { createContext, useContext, useState, useTransition } from 'react';

import { Photo } from '@/entities/models/photo';
import { uploadFileViaXhr } from '@/utils/files/upload-file';

import { initiatePhotosBatchUploadAction } from './use-cases/upload-photos/actions';

export type PhotoUpload = {
  file: File;
  uploadId: string;
  photoId: string | null;
  status: 'idle' | 'uploading' | 'completed' | 'failed';
  progress: number;
  uploadUrl: string;
};

const PhotosUploadContext = createContext<{
  uploads: PhotoUpload[];
  setUploads: (uploads: PhotoUpload[]) => void;
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

  const [uploads, setUploads] = useState<PhotoUpload[]>([]);
  const [isBatchLoading, startBatchLoadingTransition] = useTransition();

  const uploadPhotos = async (files: File[]) => {
    const uploadInputs = files.map((file) => ({
      originalFilename: file.name,
      format: file.type,
      sizeInBytes: file.size,
      uploadId: crypto.randomUUID(),
    }));

    startBatchLoadingTransition(async () => {
      // TODO: don't do batch, because we need to check upload storage quota
      const uploadRequests = await initiatePhotosBatchUploadAction(
        userId,
        collectionId,
        uploadInputs,
      );

      const uploadsQueue: PhotoUpload[] = uploadInputs.map((upload) => {
        const uploadRequest = uploadRequests.get(upload.uploadId);

        if (!uploadRequest) {
          throw new Error('Upload request not found');
        }
        const file = files.find(
          (file) => file.name === upload.originalFilename,
        );
        if (!file) {
          throw new Error('File not found');
        }

        return {
          file,
          uploadId: upload.uploadId,
          photoId: uploadRequest.photoId,
          status: 'idle',
          progress: 0,
          uploadUrl: uploadRequest.uploadUrl,
        };
      });

      setUploads(uploadsQueue);

      for (const upload of uploadsQueue) {
        setUploads((prevUploads) =>
          prevUploads.map((prevUpload) =>
            prevUpload.uploadId === upload.uploadId
              ? { ...prevUpload, status: 'uploading' }
              : prevUpload,
          ),
        );

        if (upload.uploadUrl) {
          await uploadFileViaXhr(upload.uploadUrl, upload.file, (progress) => {
            setUploads((prevUploads) =>
              prevUploads.map((prevUpload) =>
                prevUpload.uploadId === upload.uploadId
                  ? {
                      ...prevUpload,
                      progress,
                      status: progress === 100 ? 'completed' : 'uploading',
                    }
                  : prevUpload,
              ),
            );
          });

          // TODO: confirm upload, show photo in ui
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
