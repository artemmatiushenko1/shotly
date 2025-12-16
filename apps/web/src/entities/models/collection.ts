import z from 'zod';

import { categorySchema } from './category';
import { visibilityStatusSchema } from './common';

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  coverPhotoUrl: z.string().nullish(),
  coverPhotoId: z.string().nullish(),
  visibilityStatus: visibilityStatusSchema,
  shootDate: z.date(),
  photosCount: z.number().default(0),
  archivedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  photographerId: z.string(),
  category: categorySchema,
});

export type Collection = z.infer<typeof collectionSchema>;

export const createCollectionInputSchema = collectionSchema
  .pick({
    name: true,
    description: true,
    shootDate: true,
  })
  .and(
    z.object({
      categoryId: z.string(),
    }),
  );

export type CreateCollectionInput = z.infer<typeof createCollectionInputSchema>;

export const updateCollectionInputSchema = collectionSchema.partial();

export type UpdateCollectionInput = z.infer<typeof updateCollectionInputSchema>;
