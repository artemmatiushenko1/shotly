import { Collection } from '@/entities/models/collection';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

export const getPhotographerCollectionsUseCase = async (
  photographerId: string,
): Promise<Collection[]> => {
  const collections =
    await collectionsRepository.getAllCollections(photographerId);

  return collections;
};
