import z from 'zod';
import { visibilityStatusSchema } from './common';

export const serviceSchema = z.object({
  id: z.string(),
  photographerId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  coverImageUrl: z.string(),
  price: z.number(),
  currency: z.string(),
  deliveryTimeInDays: z.number(),
  visibilityStatus: visibilityStatusSchema,
  features: z.array(z.string()),
  categoryId: z.uuid(),
  archivedAt: z.date().nullable(),
});

export type Service = z.infer<typeof serviceSchema>;

export const createServiceInputSchema = serviceSchema.pick({
  name: true,
  description: true,
  coverImageUrl: true,
  price: true,
  currency: true,
  deliveryTimeInDays: true,
  visibilityStatus: true,
  features: true,
  categoryId: true,
});

export type CreateServiceInput = z.infer<typeof createServiceInputSchema>;
