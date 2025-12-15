import { DatabaseOperationError } from '@/entities/errors/common';
import { NotEnoughStorageError } from '@/entities/errors/storage';
import { CreatePhotoInput, Photo } from '@/entities/models/photo';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

import { getStorageUsageUseCase } from '../account';
import {
  PHOTOS_BUCKET_NAME,
  THUMBNAILS_BUCKET_NAME,
} from '../images/constants';
import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';

export type InitiatePhotoUploadInput = Pick<
  CreatePhotoInput,
  | 'originalFilename'
  | 'format'
  | 'sizeInBytes'
  | 'width'
  | 'height'
  | 'metadata'
>;

export type UploadResult = {
  originalPhotoUploadUrl: string;
  thumbnailUploadUrl: string;
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

  const originalPhotoUpload = await s3ImageStorage.prepareUpload(
    input.originalFilename,
    input.format,
    PHOTOS_BUCKET_NAME,
  );

  const thumbnailUpload = await s3ImageStorage.prepareUpload(
    input.originalFilename,
    input.format,
    THUMBNAILS_BUCKET_NAME,
  );

  const photo = await collectionsRepository.createPhoto(userId, collection.id, {
    format: input.format,
    url: originalPhotoUpload.publicUrl,
    sizeInBytes: input.sizeInBytes,
    originalFilename: input.originalFilename,
    storageKey: originalPhotoUpload.key,
    thumbnailUrl: thumbnailUpload.publicUrl,
    thumbnailKey: thumbnailUpload.key,
    width: input.width,
    height: input.height,
    metadata: input.metadata,
  });

  if (!photo) {
    throw new DatabaseOperationError('Failed to create photo record');
  }

  return {
    photo,
    originalPhotoUploadUrl: originalPhotoUpload.uploadUrl,
    thumbnailUploadUrl: thumbnailUpload.uploadUrl,
  };
};
