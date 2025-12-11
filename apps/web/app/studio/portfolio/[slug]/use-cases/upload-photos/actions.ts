'use server';

import { revalidatePath } from 'next/cache';

import { uploadImageUseCase } from '@/application/use-cases/images/upload-image.use-case';
import { clientEnv } from '@/env/client';
import collectionsRepository from '@/repositories/collections.repository';
import usersRepository from '@/repositories/users.repository';
import { mbToBytes } from '@/utils/files/utils';

const uploadPhotosAction = async (
  photographerId: string,
  collectionId: string,
  files: File[],
) => {
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      // TODO: should check if the user has enough storage
      // abort if not
      const uploadResult = await uploadImageUseCase(
        file,
        `portfolio/${collectionId}`,
        mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PORTFOLIO_PHOTO_SIZE_MB),
      );

      // TODO: should be a single transaction
      await collectionsRepository.createPhoto(
        photographerId,
        collectionId,
        uploadResult.url,
        uploadResult.key,
        file.size,
        file.name,
        500, // TODO: read metadata using some lib
        500, // TODO: read metadata using some lib
        file.type, // TODO: should I store only extension?
        {},
      );

      await usersRepository.updateStorageUsage(photographerId, file.size);
    }),
  );

  revalidatePath(`/portfolio/${collectionId}`);

  return uploadedFiles;
};

export default uploadPhotosAction;
