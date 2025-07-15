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

export const signInWithPassword = async (
  _: { error?: string },
  formData: FormData,
) => {
  const validatedFields = validationSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
    };
  }

  let redirectUrl: string = '';

  try {
    const res = await auth.api.signInEmail({
      body: {
        email: formData.get('email')?.toString() ?? '',
        password: formData.get('password')?.toString() ?? '',
        callbackURL: 'http://localhost:3000/',
      },
    });

    if (res.redirect && res.url) {
      redirectUrl = res.url;
    }
  } catch (e: unknown) {
    if (e instanceof APIError) {
      return { error: e.message };
    }

    return {};
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return {};
};
