'use server';

import {
  InitiatePhotoUploadInput,
  preparePhotoUploadUseCase,
} from '@/application/use-cases/portfolio';

export const preparePhotoUploadAction = async (
  userId: string,
  collectionId: string,
  input: InitiatePhotoUploadInput,
) => {
  return await preparePhotoUploadUseCase(userId, collectionId, input);
};
