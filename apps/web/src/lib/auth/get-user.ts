import 'server-only';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './auth';

export const getUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return session.user;
};
