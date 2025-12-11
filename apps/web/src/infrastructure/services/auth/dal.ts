import 'server-only';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { UnauthorizedError } from '@/entities/errors/auth';
import { Role } from '@/entities/models/user';

import { auth } from './auth';

export const getUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return session.user;
};

export const requireCustomerRole = async () => {
  const user = await getUser();
  const isCustomer = user.role === Role.CUSTOMER;

  if (!isCustomer) {
    throw new UnauthorizedError("You're not allowed to access this page.");
  }
};

export const requirePhotographerRole = async () => {
  const user = await getUser();
  const isPhotographer = user.role === Role.PHOTOGRAPHER;

  if (!isPhotographer) {
    throw new UnauthorizedError("You're not allowed to access this page.");
  }
};

export const isNewUser = async () => {
  const user = await getUser();
  return user.role === Role.UNKNOWN;
};
