'use server';

import z from 'zod';
import { visibilityStatusSchema } from '@/domain/common';
import { getUser } from '@/lib/auth/dal';
import { createServiceUseCase } from '@/use-cases/services/create-service.use-case';
import { revalidatePath } from 'next/cache';

const inputSchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  coverImageUrl: z.url({ error: 'Cover image is required' }),
  currency: z.string().min(1, { error: 'Currency is required' }),
  description: z.string(),
  categoryId: z.string().min(1, { error: 'Category is required' }),
  price: z.coerce.number().positive({ error: 'Price must be greater than 0' }),
  features: z
    .string()
    .transform((str) =>
      str
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    )
    .pipe(z.array(z.string()).min(1, { error: 'Features are required' })),
  deliveryTimeInDays: z.coerce
    .number()
    .positive({ error: 'Delivery time must be greater than 0' })
    .max(60, { error: 'Delivery time must be less than 60 days' }),
  visibilityStatus: visibilityStatusSchema,
});

export const createServiceAction = async (
  // TODO: prevent form reset on error by using initialState, pass default values to form fields
  initialState: {
    // TODO: using Record looks more like a workaround...
    inputs?: Record<string, string>;
    hasErrors: boolean;
    validationErrors?: z.core.$ZodFlattenedError<z.infer<typeof inputSchema>>;
  },
  form: FormData,
) => {
  const user = await getUser();

  const data = Object.fromEntries(form.entries());

  const { data: validatedInput, error: inputParseError } =
    await inputSchema.safeParseAsync({
      ...data,
      currency: 'UAH',
    });

  if (inputParseError) {
    return {
      hasErrors: true,
      success: false,
      inputs: {
        name: data.name as string,
        coverImageUrl: data.coverImageUrl as string,
        currency: 'UAH',
        description: data.description as string,
        categoryId: data.categoryId as string,
        price: data.price as string,
        features: data.features as string,
        deliveryTimeInDays: data.deliveryTimeInDays as string,
        visibilityStatus: data.visibilityStatus as string,
      },
      serviceName: data.name as string,
      validationErrors: z.flattenError(inputParseError),
    };
  }

  await createServiceUseCase(user.id, validatedInput);

  revalidatePath('/services');

  return {
    hasErrors: false,
    success: true,
    serviceName: validatedInput.name,
  };
};
