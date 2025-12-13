'use server';

import { revalidatePath } from 'next/cache';

import { VisibilityStatus } from '@/entities/models/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import {
  collectionFormSchema,
  CollectionFormValues,
} from '@/studio/portfolio/_ui/collection-form/collection-form.schema';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

export const changeCollectionVisibilityStatusAction = async (
  collectionId: string,
  status: VisibilityStatus,
) => {
  // TODO: collection must have a least one photo to be public

  await collectionsRepository.updateCollectionVisibilityStatus(
    collectionId,
    status,
  );

  revalidatePath(`/studio/portfolio/${collectionId}`);
};

export const updateCollectionAction = async (
  collectionId: string,
  prevState: FormActionState<CollectionFormValues>,
  formData: FormData,
) =>
  validatedFormAction(collectionFormSchema, formData, async (data) => {
    // TODO: implement update collection use case
    console.log(data, collectionId);
    return { status: 'success' };
  });
