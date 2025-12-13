import { DatabaseOperationError } from '@/entities/errors/common';
import { CreateCollectionInput } from '@/entities/models/collection';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

export const createCollectionUseCase = async (
  userId: string,
  input: CreateCollectionInput,
): Promise<string> => {
  // TODO: validate name is unique
  const collection = await collectionsRepository.createCollection(
    userId,
    input,
  );

  if (!collection) {
    throw new DatabaseOperationError('Failed to create collection');
  }

  return collection.id;
};
