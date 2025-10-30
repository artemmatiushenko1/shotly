'use server';

import { UnauthenticatedError } from '@/domain/errors/auth';
import { auth } from '@/lib/auth';
import usersRepository from '@/repositories/users.repository';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import z from 'zod';

const inputSchema = z.object({
  name: z.string().min(1, { error: 'Name must not be empty.' }),
  bio: z.string().max(500),
  username: z.string().min(1, { error: 'Username must not be empty.' }),
  websiteUrl: z.url(),
});

type UodateProfileValidationErrors = z.core.$ZodFlattenedError<
  z.infer<typeof inputSchema>
>;

export const updateProfileAction = async (
  initialState: {
    validationErrors?: UodateProfileValidationErrors;
  },
  form: FormData,
) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  if (!userId) {
    throw new UnauthenticatedError('User must be logged in to update profile!');
  }

  const data = Object.fromEntries(form.entries());

  const { data: validatedInput, error: inputParseError } =
    inputSchema.safeParse(data);

  if (inputParseError) {
    return { validationErrors: z.flattenError(inputParseError) };
  }

  await usersRepository.updateUser(userId, validatedInput);

  revalidatePath('/settings');

  return {};
};
