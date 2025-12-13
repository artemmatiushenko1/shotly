import { ForbiddenError } from '@/entities/errors/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';
import { getCollectionPhotosUseCase } from './get-collection-photos.use-case';

export const setPhotoAsCollectionCoverUseCase = async (
  userId: string,
  collectionId: string,
  photoId: string,
) => {
  const collection = await getCollectionByIdUseCase(userId, collectionId);
  const collectionPhotos = await getCollectionPhotosUseCase(
    userId,
    collection.id,
  );

  if (!collectionPhotos.some((photo) => photo.id === photoId)) {
    throw new ForbiddenError(
      `Photo ${photoId} does not belong to the collection ${collectionId}`,
    );
  }

  await collectionsRepository.updateCollectionCoverImage(collectionId, photoId);
};
