import { NotFoundError } from '@/entities/errors/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';
import { imageStorage } from '@/infrastructure/services/image-storage-service';

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
  await imageStorage.delete(photo.url);
};
