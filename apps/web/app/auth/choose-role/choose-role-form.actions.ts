'use server';

import { redirect } from 'next/navigation';

import setRoleUseCase from '@/application/use-cases/account/set-role.use-case';
import { Role } from '@/entities/models/user';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import {
  UpdateUserRoleFormValues,
  updateUserRoleSchema,
} from './choose-role-form.schema';

export const updateUserRoleAction = async (
  prevState: FormActionState<UpdateUserRoleFormValues>,
  formData: FormData,
) =>
  validatedFormAction(updateUserRoleSchema, formData, async ({ role }) => {
    const user = await getAuthenticatedUserOrRedirect();
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
