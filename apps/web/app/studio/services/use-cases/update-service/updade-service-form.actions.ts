'use server';

import { revalidatePath } from 'next/cache';

import { updateServiceUseCase } from '@/application/use-cases/services';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import {
  parseServiceFormData,
  serviceFormSchema,
  ServiceFormValues,
} from '../../_ui/service-form/service-form.schema';

export const updateServiceAction = async (
  serviceId: string,
  prevState: FormActionState<ServiceFormValues>,
  formData: FormData,
) =>
  validatedFormAction(
    serviceFormSchema,
    formData,
    async (data) => {
      const user = await getAuthenticatedUserOrRedirect();

      await updateServiceUseCase(user.id, serviceId, data);
      revalidatePath('/services');

      return {
        status: 'success',
        message: `Service "${data.name}" updated successfully!`,
      };
    },
    { normalizer: parseServiceFormData },
  );
