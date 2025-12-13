'use server';

import { redirect } from 'next/navigation';

import { createCollectionUseCase } from '@/application/use-cases/portfolio';
import { getUser } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import {
  collectionFormSchema,
  CollectionFormValues,
} from '../../_ui/collection-form/collection-form.schema';

export const createCollectionAction = async (
  prevState: FormActionState<CollectionFormValues>,
  formData: FormData,
) =>
  validatedFormAction(collectionFormSchema, formData, async (data) => {
    const user = await getUser();
    const collectionId = await createCollectionUseCase(user.id, data);
    redirect(`/studio/portfolio/${collectionId}`);
  });
