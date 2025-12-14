'use server';

import { COVER_IMAGES_BUCKET_NAME } from '@/application/use-cases/images/constants';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

export const uploadTmpCoverImageAction = async (file: File) => {
  const { uploadUrl, publicUrl } = await s3ImageStorage.prepareUpload(
    file.name,
    file.type,
    COVER_IMAGES_BUCKET_NAME,
  );

  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
  });

  return publicUrl;
};
