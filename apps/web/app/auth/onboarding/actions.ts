'use server';

import { Role } from '@/domain/user';
import { getUser } from '@/lib/auth/dal';
import usersRepository from '@/repositories/users.repository';
import { redirect } from 'next/navigation';
import z from 'zod';

const updateUserRoleSchema = z.object({
  role: z.enum(Role),
});

export const updateUserRole = async (_: { error?: string }, form: FormData) => {
  const user = await getUser();

  const { data } = updateUserRoleSchema.safeParse({
    role: form.get('role'),
  });

  if (!data) {
    return {
      error: 'Invalid role',
    };
  }

  const role = data.role;

  await usersRepository.updateUserRole(user.id, data.role);

  if (role === Role.CUSTOMER) {
    redirect('/');
  } else if (role === Role.PHOTOGRAPHER) {
    redirect('/studio/dashboard');
  } else {
    redirect('/auth/onboarding');
  }

  return {};
};
