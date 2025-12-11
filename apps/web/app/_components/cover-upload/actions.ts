'use server';

import { uploadImageUseCase } from '@/application/use-cases/images/upload-image.use-case';
import { clientEnv } from '@/env/client';
import { mbToBytes } from '@/lib/files/utils';

const TMP_COVER_IMAGE_PATH = '/tmp/covers';

export const uploadTmpCoverImage = async (file: File) => {
  const tmpCoverImageUrl = await uploadImageUseCase(
    file,
    TMP_COVER_IMAGE_PATH,
    mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB),
  );

  return tmpCoverImageUrl;
};
