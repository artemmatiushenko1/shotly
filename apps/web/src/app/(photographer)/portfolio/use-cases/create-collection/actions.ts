'use server';

import { getUser } from '@/lib/auth/get-user';
import collectionsRepository from '@/repositories/collections.repository';
import { redirect } from 'next/navigation';
import z from 'zod';

const inputSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  categoryId: z.uuid({ message: 'Category is required' }),
  shootDate: z
    .string({ error: 'Shoot date is required' })
    .transform((str) => new Date(str))
    .pipe(z.date()),
});

export const createCollection = async (
  initialState: {
    hasErrors: boolean;
    validationErrors?: z.core.$ZodFlattenedError<z.infer<typeof inputSchema>>;
  },
  form: FormData,
) => {
  const user = await getUser();

  const data = Object.fromEntries(form.entries());

  const { data: validatedInput, error: inputParseError } =
    inputSchema.safeParse(data);

  if (inputParseError) {
    return {
      hasErrors: true,
      validationErrors: z.flattenError(inputParseError),
    };
  }

  const collection = await collectionsRepository.createCollection(
    user.id,
    validatedInput,
  );

  redirect(`/portfolio/${collection.id}`);

  return {
    hasErrors: false,
  };
};
