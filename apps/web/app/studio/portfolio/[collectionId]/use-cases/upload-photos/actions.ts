'use server';

import { initiatePhotosBatchUploadUseCase } from '@/application/use-cases/portfolio';
import { InitiatePhotosBatchUploadInput } from '@/application/use-cases/portfolio/initiate-photos-batch-upload.use-case';

export const initiatePhotosBatchUploadAction = async (
  userId: string,
  collectionId: string,
  input: InitiatePhotosBatchUploadInput,
) => {
  return await initiatePhotosBatchUploadUseCase(userId, collectionId, input);
};
