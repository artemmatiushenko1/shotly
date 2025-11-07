import z from 'zod';
import { visibilityStatusSchema } from './common';

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  coverImageUrl: z.string().optional(),
  visibilityStatus: visibilityStatusSchema,
  shootDate: z.date().optional(),
  categoryId: z.string(),
  archivedAt: z.date().optional(),
});

export type Collection = z.infer<typeof collectionSchema>;
