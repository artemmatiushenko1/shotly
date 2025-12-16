import { VisibilityStatus } from '@/entities/models/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

export const getPublicCollections = (photographerId: string) => {
  return collectionsRepository.getAllCollections(
    photographerId,
    VisibilityStatus.PUBLIC,
  );
};
