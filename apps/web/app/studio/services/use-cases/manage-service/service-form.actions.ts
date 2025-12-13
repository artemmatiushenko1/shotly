'use server';

import { revalidatePath } from 'next/cache';

import {
  createServiceUseCase,
  updateServiceUseCase,
} from '@/application/use-cases/services';
import { getUser } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import { serviceFormSchema, ServiceFormValues } from './service-form.schema';

const parseFormData = (formData: FormData): Partial<ServiceFormValues> => {
  const data = Object.fromEntries(formData.entries());

  return {
    ...data,
    currency: (data.currency as string) || 'UAH',
  } as unknown as Partial<ServiceFormValues>;
};

export const createServiceAction = async (
  prevState: FormActionState<ServiceFormValues>,
  formData: FormData,
) =>
  validatedFormAction(
    serviceFormSchema,
    formData,
    async (data) => {
      const user = await getUser();

      await createServiceUseCase(user.id, {
        tmpCoverImageUrl: data.coverImageUrl,
        name: data.name,
        description: data.description,
        price: data.price,
        currency: data.currency,
        deliveryTimeInDays: data.deliveryTimeInDays,
        visibilityStatus: data.visibilityStatus,
        features: data.features,
        categoryId: data.categoryId,
      });

      revalidatePath('/services');

      return {
        status: 'success',
        message: `Service "${data.name}" created successfully!`,
      };
    },
    { normalizer: parseFormData }, // Pass the custom parser
  );

export const updateServiceAction = async (
  serviceId: string,
  prevState: FormActionState<ServiceFormValues>,
  formData: FormData,
) =>
  validatedFormAction(
    serviceFormSchema,
    formData,
    async (data) => {
      const user = await getUser();

      await updateServiceUseCase(user.id, serviceId, data);
      revalidatePath('/services');

      return {
        status: 'success',
        message: `Service "${data.name}" updated successfully!`,
      };
    },
    { normalizer: parseFormData },
  );
