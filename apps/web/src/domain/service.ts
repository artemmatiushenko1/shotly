import z from 'zod';

export enum ServiceStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
  ARCHIVED = 'archived',
}

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  coverImageUrl: z.string(),
  price: z.number(),
  currency: z.string(),
  deliveryTimeInDays: z.number(),
  status: z.enum(Object.values(ServiceStatus)),
  features: z.array(z.string()),
  categoryId: z.uuid(),
});

export type Service = z.infer<typeof serviceSchema>;

export const createServiceInputSchema = serviceSchema.pick({
  name: true,
  description: true,
  coverImageUrl: true,
  price: true,
  currency: true,
  deliveryTimeInDays: true,
  status: true,
  features: true,
  categoryId: true,
});

export type CreateServiceInput = z.infer<typeof createServiceInputSchema>;
