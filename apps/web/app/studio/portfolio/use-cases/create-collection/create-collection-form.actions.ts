'use server';

import { redirect } from 'next/navigation';

import { createCollectionUseCase } from '@/application/use-cases/portfolio/create-collection.use-case';
import { getUser } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedAction } from '@/utils/server-actions';

import {
  createCollectionFormSchema,
  CreateCollectionFormValues,
} from './create-collection-form.schema';

export const createCollection = async (
  prevState: FormActionState<CreateCollectionFormValues>,
  formData: FormData,
) =>
  validatedAction(createCollectionFormSchema, formData, async (data) => {
    const user = await getUser();
    const collectionId = await createCollectionUseCase(user.id, data);
    redirect(`/studio/portfolio/${collectionId}`);
  });
