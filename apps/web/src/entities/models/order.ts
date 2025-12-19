import z from 'zod';

import { serviceSchema } from './service';
import { userSchema } from './user';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export const orderSchema = z.object({
  id: z.string(),
  hours: z.number(),
  pricePerHour: z.number(),
  currency: z.string(),
  status: z.enum(OrderStatus),
  clientId: z.string(),
  service: serviceSchema,
  client: userSchema,
  bookingDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  notes: z.string().nullish(),
  photographer: userSchema,
});

export type Order = z.infer<typeof orderSchema>;

export const createOrderInputSchema = orderSchema
  .pick({
    hours: true,
    pricePerHour: true,
    currency: true,
    bookingDate: true,
    notes: true,
  })
  .and(
    z.object({
      clientId: z.string(),
      serviceId: z.string(),
      photographerId: z.string(),
    }),
  );

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
