'use server';

import { persistentImageStorage } from '@/lib/images/image-storage.service';
import collectionsRepository from '@/repositories/collections.repository';
import usersRepository from '@/repositories/users.repository';
import { revalidatePath } from 'next/cache';

const uploadPhotosAction = async (
  photographerId: string,
  collectionId: string,
  files: File[],
) => {
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      // TODO: should check if the user has enough storage
      // abort if not
      const uploadedFile = await persistentImageStorage.upload(file, {
        folder: `portfolio/${collectionId}`,
        maxSize: 20 * 1024 * 1024, // 20MB
        allowedMimeTypes: [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ],
      });

      // TODO: should be a single transaction
      await collectionsRepository.createPhoto(
        photographerId,
        collectionId,
        uploadedFile.url,
        uploadedFile.key!,
        file.size,
        file.name,
        500, // TODO: read metadata using some lib
        500, // TODO: read metadata using some lib
        file.type, // TODO: should I store only extension?
        {},
      );
      await usersRepository.updateStorageUsage(photographerId, file.size);

      return uploadedFile;
    }),
  );

  revalidatePath(`/portfolio/${collectionId}`);

  return uploadedFiles;
};

export default uploadPhotosAction;
