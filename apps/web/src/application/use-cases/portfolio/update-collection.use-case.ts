import {
  UpdateCollectionInput,
  updateCollectionInputSchema,
} from '@/entities/models/collection';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';

export const updateCollectionUseCase = async (
  userId: string,
  collectionId: string,
  input: UpdateCollectionInput,
) => {
  const collection = await getCollectionByIdUseCase(userId, collectionId);

  await collectionsRepository.updateCollection(
    collection.id,
    updateCollectionInputSchema.parse(input),
  );
};
