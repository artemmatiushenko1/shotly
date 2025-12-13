'use server';

import { revalidatePath } from 'next/cache';

import { NotFoundError } from '@/entities/errors/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

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

  revalidatePath(`/portfolio/${collectionId}`);
};
