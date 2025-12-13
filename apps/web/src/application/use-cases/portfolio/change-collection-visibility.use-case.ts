import { VisibilityStatus } from '@/entities/models/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';

export const changeCollectionVisibilityUseCase = async (
  userId: string,
  collectionId: string,
  visibilityStatus: VisibilityStatus,
) => {
  const collection = await getCollectionByIdUseCase(userId, collectionId);

  await collectionsRepository.updateCollectionVisibilityStatus(
    collection.id,
    visibilityStatus,
  );
};
