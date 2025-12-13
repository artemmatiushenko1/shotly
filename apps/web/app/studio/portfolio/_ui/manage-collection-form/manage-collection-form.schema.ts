import z from 'zod';

import {
  COLLECTION_DESCRIPTION_MAX_LENGTH,
  COLLECTION_NAME_MAX_LENGTH,
} from '@/application/use-cases/portfolio/constants';

export const manageCollectionFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(COLLECTION_NAME_MAX_LENGTH, {
      message: `Name must be less than ${COLLECTION_NAME_MAX_LENGTH} characters`,
    }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(COLLECTION_DESCRIPTION_MAX_LENGTH, {
      message: `Description must be less than ${COLLECTION_DESCRIPTION_MAX_LENGTH} characters`,
    }),
  categoryId: z.uuid({ message: 'Category is required' }),
  shootDate: z
    .string({ error: 'Shoot date is required' })
    .transform((str) => new Date(str))
    .pipe(z.date()),
});

export type ManageCollectionFormValues = z.infer<
  typeof manageCollectionFormSchema
>;
