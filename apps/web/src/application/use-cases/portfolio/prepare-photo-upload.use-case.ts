import { DatabaseOperationError } from '@/entities/errors/common';
import { NotEnoughStorageError } from '@/entities/errors/storage';
import { CreatePhotoInput, Photo } from '@/entities/models/photo';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

import { getStorageUsageUseCase } from '../account';
import { PHOTOS_BUCKET_NAME } from '../images/constants';
import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';

export type InitiatePhotoUploadInput = Pick<
  CreatePhotoInput,
  'originalFilename' | 'format' | 'sizeInBytes'
>;

export type UploadResult = {
  uploadUrl: string;
  photo: Photo;
};

export const preparePhotoUploadUseCase = async (
  userId: string,
  collectionId: string,
  input: InitiatePhotoUploadInput,
): Promise<UploadResult> => {
  const collection = await getCollectionByIdUseCase(userId, collectionId);
  const storageUsage = await getStorageUsageUseCase(userId);

  if (
    storageUsage.storageUsage + input.sizeInBytes >
    storageUsage.storageLimit
  ) {
    throw new NotEnoughStorageError('Not enough storage');
  }

  const { uploadUrl, key, publicUrl } = await s3ImageStorage.prepareUpload(
    input.originalFilename,
    input.format,
    PHOTOS_BUCKET_NAME,
  );

  const photo = await collectionsRepository.createPhoto(userId, collection.id, {
    format: input.format,
    url: publicUrl,
    sizeInBytes: input.sizeInBytes,
    originalFilename: input.originalFilename,
    storageKey: key,
  });

  if (!photo) {
    throw new DatabaseOperationError('Failed to create photo record');
  }

  return {
    photo,
    uploadUrl,
  };
};
