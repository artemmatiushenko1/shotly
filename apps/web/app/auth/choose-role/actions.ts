'use server';

import { redirect } from 'next/navigation';
import z from 'zod';

import setRoleUseCase from '@/application/use-cases/account/set-role.use-case';
import { Role } from '@/entities/models/user';
import { getUser } from '@/infrastructure/services/auth/dal';

const updateUserRoleSchema = z.object({
  role: z.enum(Role),
});

export const updateUserRoleAction = async (
  _: { error?: string },
  form: FormData,
) => {
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

  await setRoleUseCase(user.id, data.role);

  if (role === Role.CUSTOMER) {
    redirect('/');
  } else if (role === Role.PHOTOGRAPHER) {
    redirect('/studio/dashboard');
  } else {
    redirect('/auth/choose-role');
  }

  return {};
};
