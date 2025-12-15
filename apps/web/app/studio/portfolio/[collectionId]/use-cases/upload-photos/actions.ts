'use server';

import { revalidatePath } from 'next/cache';

import {
  confirmPhotoUploadUseCase,
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

export const confirmPhotoUploadAction = async (
  userId: string,
  photoId: string,
  collectionId: string,
) => {
  await confirmPhotoUploadUseCase(userId, photoId);
  revalidatePath(`/studio/portfolio/${collectionId}`);
};
