import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

import { advanceStorageUsageUseCase } from '../account';
import { PHOTOS_BUCKET_NAME } from '../images/constants';
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
    s3ImageStorage.delete(photoUrl, PHOTOS_BUCKET_NAME);
  });
};
