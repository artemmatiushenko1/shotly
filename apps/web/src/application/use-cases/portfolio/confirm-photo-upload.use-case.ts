import { NotFoundError } from '@/entities/errors/common';
import { PhotoUploadStatus } from '@/entities/models/photo';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

import { advanceStorageUsageUseCase } from '../account';
import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';

export const confirmPhotoUploadUseCase = async (
  userId: string,
  photoId: string,
) => {
  const photo = await collectionsRepository.getPhotoById(photoId);

  if (!photo) {
    throw new NotFoundError(`Photo ${photoId} not found`);
  }

  await getCollectionByIdUseCase(userId, photo.collectionId);

  // TODO: should be a single transaction
  await collectionsRepository.updatePhotoStatus(
    photoId,
    PhotoUploadStatus.COMPLETED,
  );
  await advanceStorageUsageUseCase(userId, photo.sizeInBytes);
};
