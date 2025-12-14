'use server';

import { revalidatePath } from 'next/cache';

import { advanceStorageUsageUseCase } from '@/application/use-cases/account';
import { PHOTOS_BUCKET_NAME } from '@/application/use-cases/images/constants';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

const uploadPhotosAction = async (
  photographerId: string,
  collectionId: string,
  files: File[],
) => {
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      // TODO: should check if the user has enough storage
      // abort if not
      const { uploadUrl, publicUrl, key } = await s3ImageStorage.prepareUpload(
        file.name,
        file.type,
        PHOTOS_BUCKET_NAME,
      );

      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
      });

      // TODO: should be a single transaction
      await collectionsRepository.createPhoto(
        photographerId,
        collectionId,
        publicUrl,
        key,
        file.size,
        file.name,
        500, // TODO: read metadata using some lib
        500, // TODO: read metadata using some lib
        file.type, // TODO: should I store only extension?
        {},
      );

      await advanceStorageUsageUseCase(photographerId, file.size);
    }),
  );

  revalidatePath(`/studio/portfolio/${collectionId}`);

  return uploadedFiles;
};

export default uploadPhotosAction;
