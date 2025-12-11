'use server';

import { TEMP_COVER_IMAGE_STORAGE_PATH } from '@/application/use-cases/images/constants';
import { uploadImageUseCase } from '@/application/use-cases/images/upload-image.use-case';
import { clientEnv } from '@/env/client';
import { mbToBytes } from '@/utils/files/utils';

export const uploadTmpCoverImage = async (file: File) => {
  const tmpCoverImageUrl = await uploadImageUseCase(
    file,
    TEMP_COVER_IMAGE_STORAGE_PATH,
    mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB),
  );

  return tmpCoverImageUrl;
};
