import 'server-only';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { Role } from '@/domain/user';

export const getUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return session.user;
};

export const isCustomer = async () => {
  const user = await getUser();
  return user.role === Role.CUSTOMER;
};

export const isPhotographer = async () => {
  const user = await getUser();
  return user.role === Role.PHOTOGRAPHER;
};

export const isNewUser = async () => {
  const user = await getUser();
  return user.role === Role.UNKNOWN;
};
