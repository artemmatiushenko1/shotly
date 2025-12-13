'use server';

import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';

import { auth } from '@/infrastructure/services/auth/auth';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import { SignUpFormValues, signUpSchema } from './sign-up-form.schema';

export const signUpWithGoogleAction = async () => {
  const res = await auth.api.signInSocial({
    body: {
      provider: 'google',
      callbackURL: '/studio/dashboard',
    },
  });

  if (res.redirect && res.url) {
    redirect(res.url);
  }
};

export const signUpAction = async (
  prevState: FormActionState<SignUpFormValues>,
  formData: FormData,
) =>
  validatedFormAction(signUpSchema, formData, async (data) => {
    try {
      const response = await auth.api.signUpEmail({
        body: {
          email: data.email,
          password: data.password,
          name: `${data.firstName} ${data.lastName}`,
        },
      });

      if (response.token) {
        redirect('/auth/choose-role');
      }

      return { status: 'success', message: 'Sign up successful' };
    } catch (e: unknown) {
      if (e instanceof APIError) {
        return { status: 'error', message: e.message };
      }

      throw e;
    }
  });
