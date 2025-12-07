'use server';

import { clientEnv } from '@/env/client';
import { MimeType } from '@/lib/files/enums';
import { mbToBytes } from '@/lib/files/utils';
import { tmpImageStorage } from '@/lib/images/image-storage.service';

export const uploadTmpCoverImage = async (file: File) => {
  const uploadResult = await tmpImageStorage.upload(file, {
    folder: 'covers',
    maxSize: mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB),
    allowedMimeTypes: [
      MimeType.JPEG,
      MimeType.JPG,
      MimeType.PNG,
      MimeType.WEBP,
    ],
  });

  return uploadResult;
};
