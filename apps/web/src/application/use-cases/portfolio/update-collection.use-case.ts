import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import {
  UpdateCollectionInput,
  updateCollectionInputSchema,
} from '@/entities/models/collection';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

export const updateCollectionUseCase = async (
  userId: string,
  collectionId: string,
  input: UpdateCollectionInput,
) => {
  const collection =
    await collectionsRepository.getCollectionById(collectionId);

  if (!collection) {
    throw new NotFoundError('Collection not found');
  }

  if (collection.photographerId !== userId) {
    throw new ForbiddenError('You are not allowed to update this collection');
  }

  await collectionsRepository.updateCollection(
    collectionId,
    updateCollectionInputSchema.parse(input),
  );
};
