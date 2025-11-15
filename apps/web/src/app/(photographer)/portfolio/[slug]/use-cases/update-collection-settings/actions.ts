'use server';

import { VisibilityStatus } from '@/domain/common';
import collectionsRepository from '@/repositories/collections.repository';
import { revalidatePath } from 'next/cache';

const changeCollectionVisibilityStatusAction = async (
  collectionId: string,
  status: VisibilityStatus,
) => {
  const collection =
    await collectionsRepository.updateCollectionVisibilityStatus(
      collectionId,
      status,
    );

  revalidatePath(`/portfolio/${collection.id}`);

  return collection;
};

export { changeCollectionVisibilityStatusAction };
