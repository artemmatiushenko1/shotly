'use server';

import { VisibilityStatus } from '@/domain/common';
import collectionsRepository from '@/repositories/collections.repository';
import { revalidatePath } from 'next/cache';

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
