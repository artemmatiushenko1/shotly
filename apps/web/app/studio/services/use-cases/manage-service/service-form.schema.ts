import { z } from 'zod';

import { visibilityStatusSchema } from '@/entities/models/common';

export const DESCRIPTION_MAX_LENGTH = 500;

export const serviceFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  coverImageUrl: z.string().min(1, { message: 'Cover image is required' }),
  currency: z.string().default('UAH'),
  description: z.string().max(DESCRIPTION_MAX_LENGTH, {
    message: 'Description must be less than 500 characters',
  }),
  categoryId: z.string().min(1, { message: 'Category is required' }),
  price: z.coerce
    .number()
    .positive({ message: 'Price must be greater than 0' }),
  features: z
    .string()
    .transform((str) =>
      str
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    )
    .pipe(
      z
        .array(z.string())
        .min(1, { message: 'At least one feature is required' }),
    ),
  deliveryTimeInDays: z.coerce
    .number()
    .positive({ message: 'Delivery time must be positive' }),
  visibilityStatus: visibilityStatusSchema,
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
