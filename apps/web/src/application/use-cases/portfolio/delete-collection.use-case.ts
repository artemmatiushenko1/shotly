import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { imageStorage } from '@/infrastructure/services/image-storage-service';

import { advanceStorageUsageUseCase } from '../account';
import { getCollectionByIdUseCase } from './get-collection-by-id.use-case';
import { getCollectionPhotosUseCase } from './get-collection-photos.use-case';

export const deleteCollectionUseCase = async (
  userId: string,
  collectionId: string,
) => {
  const collection = await getCollectionByIdUseCase(userId, collectionId);
  const collectionPhotos = await getCollectionPhotosUseCase(
    userId,
    collection.id,
  );

  const photosTotalSizeBytes = collectionPhotos.reduce(
    (acc, photo) => acc + photo.sizeInBytes,
    0,
  );
  const photosUrls = collectionPhotos.map((photo) => photo.url);

  await collectionsRepository.deleteCollection(collection.id);
  await advanceStorageUsageUseCase(userId, -photosTotalSizeBytes);

  photosUrls.forEach(async (photoUrl) => {
    imageStorage.delete(photoUrl);
  });
};
