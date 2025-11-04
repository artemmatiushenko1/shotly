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
});

export type Service = z.infer<typeof serviceSchema>;
