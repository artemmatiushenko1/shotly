import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';
import { auth } from './auth';

export async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return session.user;
}
