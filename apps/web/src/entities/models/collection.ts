import z from 'zod';

import { visibilityStatusSchema } from './common';

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  coverPhotoUrl: z.string().nullish(),
  coverPhotoId: z.string().nullish(),
  visibilityStatus: visibilityStatusSchema,
  shootDate: z.date(),
  categoryId: z.string(),
  photosCount: z.number().default(0),
  archivedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Collection = z.infer<typeof collectionSchema>;

export const createCollectionInputSchema = collectionSchema.pick({
  name: true,
  description: true,
  shootDate: true,
  categoryId: true,
});

export type CreateCollectionInput = z.infer<typeof createCollectionInputSchema>;
