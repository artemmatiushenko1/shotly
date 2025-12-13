'use server';

import { revalidatePath } from 'next/cache';

import {
  changeCollectionVisibilityUseCase,
  updateCollectionUseCase,
} from '@/application/use-cases/portfolio';
import { VisibilityStatus } from '@/entities/models/common';
import { getUser } from '@/infrastructure/services/auth/dal';
import {
  collectionFormSchema,
  CollectionFormValues,
} from '@/studio/portfolio/_ui/collection-form/collection-form.schema';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

export const changeCollectionVisibilityStatusAction = async (
  collectionId: string,
  status: VisibilityStatus,
) => {
  const user = await getUser();
  await changeCollectionVisibilityUseCase(user.id, collectionId, status);
  revalidatePath(`/studio/portfolio/${collectionId}`);
  return { status: 'success' };
};

export const updateCollectionAction = async (
  collectionId: string,
  prevState: FormActionState<CollectionFormValues>,
  formData: FormData,
) =>
  validatedFormAction(collectionFormSchema, formData, async (data) => {
    const user = await getUser();
    await updateCollectionUseCase(user.id, collectionId, data);
    revalidatePath(`/studio/portfolio/${collectionId}`);
    return { status: 'success', message: 'Collection updated successfully' };
  });
