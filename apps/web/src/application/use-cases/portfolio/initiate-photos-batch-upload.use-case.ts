import { DatabaseOperationError } from '@/entities/errors/common';
import { CreatePhotoInput } from '@/entities/models/photo';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

import { PHOTOS_BUCKET_NAME } from '../images/constants';

export type BatchUploadItem = Pick<
  CreatePhotoInput,
  'originalFilename' | 'format' | 'sizeInBytes'
> & {
  uploadId: string;
};

export type BatchUploadResult = {
  uploadId: string;
  photoId: string;
  uploadUrl: string;
  storageKey: string;
  originalFilename: string;
  format: string;
  sizeInBytes: number;
  publicUrl: string;
};

export const initiatePhotosBatchUploadUseCase = async (
  userId: string,
  collectionId: string,
  items: BatchUploadItem[],
): Promise<Map<string, BatchUploadResult>> => {
  const uploadRequests = await Promise.all(
    items.map(async (item) => {
      const { uploadUrl, key, publicUrl } = await s3ImageStorage.prepareUpload(
        item.originalFilename,
        item.format,
        PHOTOS_BUCKET_NAME,
      );
      return { uploadId: item.uploadId, uploadUrl, key, publicUrl };
    }),
  );

  const uploadRequestsMap = new Map(uploadRequests.map((r) => [r.uploadId, r]));
  const itemsMap = new Map(items.map((i) => [i.uploadId, i]));

  const results = await Promise.all(
    items.map(async (item) => {
      const request = uploadRequestsMap.get(item.uploadId);
      const inputData = itemsMap.get(item.uploadId);

      if (!request || !inputData) {
        throw new Error('Upload request or input data not found');
      }

      const photo = await collectionsRepository.createPhoto(
        userId,
        collectionId,
        {
          format: inputData.format,
          url: request.publicUrl,
          sizeInBytes: inputData.sizeInBytes,
          originalFilename: inputData.originalFilename,
          storageKey: request.key,
        },
      );

      if (!photo) {
        throw new DatabaseOperationError('Failed to create photo');
      }

      const result: BatchUploadResult = {
        uploadId: item.uploadId,
        photoId: photo.id,
        uploadUrl: request.uploadUrl,
        storageKey: request.key,
        originalFilename: photo.originalFilename,
        format: photo.format,
        sizeInBytes: photo.sizeInBytes,
        publicUrl: request.publicUrl,
      };

      return [item.uploadId, result] as const;
    }),
  );

  return new Map(results);
};
