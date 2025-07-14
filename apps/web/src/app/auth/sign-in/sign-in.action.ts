'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const signIn = async () => {
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
