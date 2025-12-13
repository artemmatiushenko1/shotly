import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import { VisibilityStatus } from '@/entities/models/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

export const changeCollectionVisibilityUseCase = async (
  userId: string,
  collectionId: string,
  visibilityStatus: VisibilityStatus,
) => {
  const collection =
    await collectionsRepository.getCollectionById(collectionId);

  if (!collection) {
    throw new NotFoundError('Collection not found');
  }

  if (collection.photographerId !== userId) {
    throw new ForbiddenError('You are not allowed to update this collection');
  }
  await collectionsRepository.updateCollectionVisibilityStatus(
    collectionId,
    visibilityStatus,
  );
};
