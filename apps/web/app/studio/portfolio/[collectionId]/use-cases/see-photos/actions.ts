'use server';

import { revalidatePath } from 'next/cache';

import { deletePhotoUseCase } from '@/application/use-cases/portfolio';
import { setPhotoAsCollectionCoverUseCase } from '@/application/use-cases/portfolio';
import { getUser } from '@/infrastructure/services/auth/dal';

export const setPhotoAsCollectionCoverAction = async (
  collectionId: string,
  photoId: string,
) => {
  const user = await getUser();
  await setPhotoAsCollectionCoverUseCase(user.id, collectionId, photoId);
  revalidatePath(`/studio/portfolio/${collectionId}`);
};

export const deletePhotoAction = async (
  photoId: string,
  collectionId: string,
) => {
  const user = await getUser();
  await deletePhotoUseCase(user.id, photoId);
  revalidatePath(`/studio/portfolio/${collectionId}`);
};
