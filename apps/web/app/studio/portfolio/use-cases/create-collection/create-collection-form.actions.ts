'use server';

import { redirect } from 'next/navigation';

import { createCollectionUseCase } from '@/application/use-cases/portfolio/create-collection.use-case';
import { getUser } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import {
  manageCollectionFormSchema,
  ManageCollectionFormValues,
} from '../../_ui/manage-collection-form/manage-collection-form.schema';

export const createCollectionAction = async (
  prevState: FormActionState<ManageCollectionFormValues>,
  formData: FormData,
) =>
  validatedFormAction(manageCollectionFormSchema, formData, async (data) => {
    const user = await getUser();
    const collectionId = await createCollectionUseCase(user.id, data);
    redirect(`/studio/portfolio/${collectionId}`);
  });
