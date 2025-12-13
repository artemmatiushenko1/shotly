'use server';

import { revalidatePath } from 'next/cache';

import { deletePhotoUseCase } from '@/application/use-cases/portfolio';
import { NotFoundError } from '@/entities/errors/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { getUser } from '@/infrastructure/services/auth/dal';

export const setCollectionCoverImage = async (
  collectionId: string,
  photoId: string,
) => {
  // TODO: verify user is the owner of the collection
  const collection =
    await collectionsRepository.getCollectionById(collectionId);

  if (!collection) {
    throw new NotFoundError('Collection not found');
  }

  await collectionsRepository.updateCollectionCoverImage(collectionId, photoId);

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
