'use server';

import { revalidatePath } from 'next/cache';

import { createServiceUseCase } from '@/application/use-cases/services';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import {
  parseServiceFormData,
  serviceFormSchema,
  ServiceFormValues,
} from '../../_ui/service-form/service-form.schema';

export const createServiceAction = async (
  prevState: FormActionState<ServiceFormValues>,
  formData: FormData,
) =>
  validatedFormAction(
    serviceFormSchema,
    formData,
    async (data) => {
      const user = await getAuthenticatedUserOrRedirect();

      await createServiceUseCase(user.id, data);

      revalidatePath('/services');

      return {
        status: 'success',
        message: `Service "${data.name}" created successfully!`,
      };
    },
    { normalizer: parseServiceFormData },
  );
