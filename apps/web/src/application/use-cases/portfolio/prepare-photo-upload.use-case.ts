import { DatabaseOperationError } from '@/entities/errors/common';
import { CreatePhotoInput, Photo } from '@/entities/models/photo';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

import { PHOTOS_BUCKET_NAME } from '../images/constants';

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
  // A. Prepare S3
  const { uploadUrl, key, publicUrl } = await s3ImageStorage.prepareUpload(
    input.originalFilename,
    input.format,
    PHOTOS_BUCKET_NAME,
  );

  // B. Create DB Record (This is where Quota should be checked in your repo)
  const photo = await collectionsRepository.createPhoto(userId, collectionId, {
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
