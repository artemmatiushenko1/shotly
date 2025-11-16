'use server';

import imageStorage from '@/lib/images/image-storage.service';
import collectionsRepository from '@/repositories/collections.repository';
import { revalidatePath } from 'next/cache';

const uploadPhotosAction = async (
  photographerId: string,
  collectionId: string,
  files: File[],
) => {
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      const uploadedFile = await imageStorage.upload(file, {
        folder: `portfolio/${collectionId}`,
        maxSize: 20 * 1024 * 1024, // 20MB
        allowedMimeTypes: [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ],
      });

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

      return uploadedFile;
    }),
  );

  revalidatePath(`/portfolio/${collectionId}`);

  return uploadedFiles;
};

export default uploadPhotosAction;
