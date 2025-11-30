'use server';

import { tmpImageStorage } from '@/lib/images/image-storage.service';

export const uploadTmpCoverImage = async (file: File) => {
  const uploadResult = await tmpImageStorage.upload(file, {
    folder: 'covers',
    maxSize: 2 * 1024 * 1024, // 2MB // TODO: add max size to env
    allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  });

  return uploadResult;
};
