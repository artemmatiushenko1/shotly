import collectionsRepository from '@/infrastructure/repositories/collections.repository';

import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';

export const getCollectionPhotosUseCase = async (
  userId: string,
  collectionId: string,
) => {
  const collection = await getCollectionByIdUseCase(userId, collectionId);
  const photos = await collectionsRepository.getPhotosByCollectionId(
    collection.id,
  );

  return photos;
};
