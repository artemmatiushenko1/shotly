'use server';

import { auth } from '@/lib/auth';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';
import z from 'zod';

export const signInWithGoogle = async () => {
  const res = await auth.api.signInSocial({
    body: {
      provider: 'google',
      callbackURL: 'http://localhost:3000/',
    },
  });

  if (res.redirect && res.url) {
    redirect(res.url);
  }
};

const validationSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }),
});

type ValidationErrors = z.core.$ZodFlattenedError<
  z.infer<typeof validationSchema>
>;

export const signInWithPassword = async (
  _: { formError?: string; validationErrors?: ValidationErrors },
  formData: FormData,
) => {
  const validatedFields = validationSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: z.flattenError(validatedFields.error),
    };
  }

  let redirectUrl = '';

  try {
    const { data } = validatedFields;

    const res = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        callbackURL: '/',
      },
    });

    if (res.redirect && res.url) {
      redirectUrl = res.url;
    }
  } catch (e: unknown) {
    if (e instanceof APIError) {
      return { formError: e.message };
    }

    return {};
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return {};
};
