'use server';

import { auth } from '@/lib/auth';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';

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

export const signInWithPassword = async (
  _: { error?: string },
  formData: FormData,
) => {
  let redirectUrl: string = '';

  try {
    const res = await auth.api.signInEmail({
      body: {
        email: formData.get('email')?.toString() ?? '',
        password: formData.get('password')?.toString() ?? '',
        callbackURL: 'http://localhost:3000/',
      },
    });

    console.log({ res });

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
