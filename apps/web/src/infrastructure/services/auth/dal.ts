import 'server-only';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { UnauthorizedError } from '@/entities/errors/auth';
import { ApprovalStatus, Role } from '@/entities/models/user';

import { auth } from './auth';

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  approvalStatus: ApprovalStatus;
  image: string;
};

export const getAuthenticatedUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user as AuthenticatedUser | undefined;
};

export const getAuthenticatedUserOrRedirect = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return session.user as AuthenticatedUser;
};

export const requireCustomerRole = async () => {
  const user = await getAuthenticatedUserOrRedirect();
  const isCustomer = user.role === Role.CUSTOMER;

  if (!isCustomer) {
    throw new UnauthorizedError("You're not allowed to access this page.");
  }
};

export const requirePhotographerRole = async () => {
  const user = await getAuthenticatedUserOrRedirect();
  const isPhotographer = user.role === Role.PHOTOGRAPHER;

  if (!isPhotographer) {
    throw new UnauthorizedError("You're not allowed to access this page.");
  }
};

export const isNewUser = async () => {
  const user = await getAuthenticatedUserOrRedirect();
  return user.role === Role.UNKNOWN;
};
