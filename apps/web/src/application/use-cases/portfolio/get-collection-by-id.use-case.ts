import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

export const getCollectionByIdUseCase = async (
  authUserId: string,
  collectionId: string,
) => {
  const collection =
    await collectionsRepository.getCollectionById(collectionId);

  if (!collection) {
    throw new NotFoundError('Collection not found');
  }

  if (collection.photographerId !== authUserId) {
    throw new ForbiddenError('You are not allowed to access this collection');
  }

  return collection;
};
