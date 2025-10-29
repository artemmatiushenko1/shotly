// perform input validation
// authentication check - if user is logged in

import { UnauthenticatedError } from '@/domain/errors/auth';
import { InputParseError } from '@/domain/errors/common';
import { updateUserUseCase } from '@/use-cases/users/update-user.use-case';
import z from 'zod';

const inputSchema = z.object({
  name: z.string(),
  bio: z.string(),
  username: z.string(),
  websiteUrl: z.url(),
});

export const updateUserController = async (
  input: Partial<z.infer<typeof inputSchema>>,
  userId: string | undefined,
) => {
  if (!userId) {
    throw new UnauthenticatedError('Must be logged in to create a todo');
  }

  const { data: validatedInput, error: inputParseError } =
    inputSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError('Invalid data', { cause: inputParseError });
  }

  await updateUserUseCase(validatedInput, userId);
};
