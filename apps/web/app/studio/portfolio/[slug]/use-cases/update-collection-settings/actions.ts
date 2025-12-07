'use server';

import { revalidatePath } from 'next/cache';

import { VisibilityStatus } from '@/domain/common';
import collectionsRepository from '@/repositories/collections.repository';

const changeCollectionVisibilityStatusAction = async (
  collectionId: string,
  status: VisibilityStatus,
) => {
  // TODO: collection must have a least one photo to be public

  await collectionsRepository.updateCollectionVisibilityStatus(
    collectionId,
    status,
  );

  revalidatePath(`/portfolio/${collectionId}`);
};

export { changeCollectionVisibilityStatusAction };
