'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import {
  createServiceUseCase,
  updateServiceUseCase,
} from '@/application/use-cases/services';
import { getUser } from '@/lib/auth/dal';

import {
  serviceFormSchema,
  ServiceFormState,
  ServiceFormValues,
} from './service-form.schema';

const parseFormData = (formData: FormData): Partial<ServiceFormValues> => {
  const data = Object.fromEntries(formData.entries());

  return {
    ...data,
    currency: (data.currency as string) || 'UAH',
  } as unknown as Partial<ServiceFormValues>;
};

export async function createServiceAction(
  prevState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  const user = await getUser();
  const rawInputs = parseFormData(formData);
  const validation = serviceFormSchema.safeParse(rawInputs);

  if (validation.error) {
    return {
      status: 'error',
      message: 'Validation failed',
      errors: z.flattenError(validation.error).fieldErrors,
      inputs: rawInputs,
    };
  }

  try {
    await createServiceUseCase(user.id, validation.data);
    revalidatePath('/services');
    return {
      status: 'success',
      message: `Service "${validation.data.name}" created successfully!`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return {
      status: 'error',
      message: errorMessage,
      inputs: rawInputs,
    };
  }
}

export async function updateServiceAction(
  serviceId: string,
  prevState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  const user = await getUser();
  const rawInputs = parseFormData(formData);
  const validation = serviceFormSchema.safeParse(rawInputs);

  if (!validation.success) {
    return {
      status: 'error',
      message: 'Validation failed',
      errors: z.flattenError(validation.error).fieldErrors,
      inputs: rawInputs,
    };
  }

  try {
    await updateServiceUseCase(user.id, serviceId, validation.data);
    revalidatePath('/services');
    return {
      status: 'success',
      message: `Service "${validation.data.name}" updated successfully!`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      status: 'error',
      message: errorMessage,
      inputs: rawInputs,
    };
  }
}
