import { NotFoundError } from '@/entities/errors/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

import { PHOTOS_BUCKET_NAME } from '../images/constants';
import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';

export const deletePhotoUseCase = async (userId: string, photoId: string) => {
  const photo = await collectionsRepository.getPhotoById(photoId);

  if (!photo) {
    throw new NotFoundError('Photo not found');
  }

  await getCollectionByIdUseCase(userId, photo.collectionId);

  // TODO: should be done in a transaction
  await collectionsRepository.deletePhoto(photoId);
  await usersRepository.updateStorageUsage(userId, -photo.sizeInBytes);
  await s3ImageStorage.delete(photo.storageKey, PHOTOS_BUCKET_NAME);
};
