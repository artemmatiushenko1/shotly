'use server';

import { redirect } from 'next/navigation';

import setRoleUseCase from '@/application/use-cases/account/set-role.use-case';
import { Role } from '@/entities/models/user';
import { getUser } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedAction } from '@/utils/server-actions';

import {
  UpdateUserRoleFormValues,
  updateUserRoleSchema,
} from './choose-role-form.schema';

export const updateUserRoleAction = async (
  prevState: FormActionState<UpdateUserRoleFormValues>,
  formData: FormData,
) =>
  validatedAction(updateUserRoleSchema, formData, async ({ role }) => {
    const user = await getUser();
    await setRoleUseCase(user.id, role);

    if (role === Role.CUSTOMER) {
      redirect('/');
    } else if (role === Role.PHOTOGRAPHER) {
      redirect('/studio/dashboard');
    } else {
      redirect('/auth/choose-role');
    }

    return { status: 'success', message: 'User role updated' };
  });
