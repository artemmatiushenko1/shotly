'use server';

import { UnauthenticatedError } from '@/domain/errors/auth';
import { auth } from '@/lib/auth/auth';
import collectionsRepository from '@/repositories/collections.repository';
import { headers } from 'next/headers';
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
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  if (!userId) {
    throw new UnauthenticatedError(
      'User must be logged in to create collection!',
    );
  }

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
    userId,
    validatedInput,
  );

  redirect(`/portfolio/${collection.id}`);

  return {
    hasErrors: false,
  };
};
