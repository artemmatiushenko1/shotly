'use server';

import { NotFoundError } from '@/domain/errors/common';
import collectionsRepository from '@/repositories/collections.repository';
import { revalidatePath } from 'next/cache';

export const setCollectionCoverImage = async (
  collectionId: string,
  photoUrl: string,
) => {
  // TODO: verify user is the owner of the collection
  const collection =
    await collectionsRepository.getCollectionById(collectionId);

  if (!collection) {
    throw new NotFoundError('Collection not found');
  }

  // TODO: should use image id instead of photo url
  await collectionsRepository.updateCollectionCoverImage(
    collectionId,
    photoUrl,
  );

  revalidatePath(`/portfolio/${collectionId}`);
};
