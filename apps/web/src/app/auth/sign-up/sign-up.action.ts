'use server';

import { auth } from '@/lib/auth';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';
import z from 'zod';

const validationSchema = z.object({
  firstName: z.string().nonempty({ error: 'First name is required' }),
  lastName: z.string().nonempty({ error: 'Last name is required' }),
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }),
});

type ValidationErrors = z.core.$ZodFlattenedError<
  z.infer<typeof validationSchema>
>;

export const signUp = async (
  _: { formError?: string; validationErrors?: ValidationErrors },
  formData: FormData,
) => {
  const validatedFields = validationSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: z.flattenError(validatedFields.error),
    };
  }

  const { data } = validatedFields;

  let redirectUrl = '';

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        callbackURL: 'http://localhost:3000/',
      },
    });

    if (response.token) {
      redirectUrl = 'http://localhost:3000/';
    }
  } catch (e: unknown) {
    if (e instanceof APIError) {
      return { formError: e.message };
    }
  }

  if (redirectUrl) {
    redirect('http://localhost:3000/');
  }

  return {};
};
