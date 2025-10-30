'use server';

import { UnauthenticatedError } from '@/domain/errors/auth';
import { InputParseError } from '@/domain/errors/common';
import { auth } from '@/lib/auth';
import usersRepository from '@/repositories/users.repository';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import z from 'zod';

const inputSchema = z.object({
  name: z.string(),
  bio: z.string(),
  username: z.string(),
  websiteUrl: z.url(),
});

export const updateProfileAction = async (form: FormData) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  if (!userId) {
    throw new UnauthenticatedError('User must be logged in to update profile!');
  }

  const data = Object.fromEntries(form.entries());

  const { data: validatedInput, error: inputParseError } =
    inputSchema.safeParse(data);

  if (inputParseError) {
    throw new InputParseError('Invalid data', { cause: inputParseError });
  }

  await usersRepository.updateUser(userId, validatedInput);

  revalidatePath('/settings');
};
