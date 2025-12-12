'use server';

import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';

import { auth } from '@/infrastructure/services/auth/auth';
import { FormActionState, validatedAction } from '@/utils/server-actions';

import {
  SignInWithPasswordFormValues,
  signInWithPasswordSchema,
} from './sign-in-form.schema';

export const signInWithGoogleAction = async () => {
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

export const signInWithPasswordAction = async (
  prevState: FormActionState<SignInWithPasswordFormValues>,
  formData: FormData,
) => {
  return validatedAction(signInWithPasswordSchema, formData, async (data) => {
    try {
      const res = await auth.api.signInEmail({
        body: {
          email: data.email,
          password: data.password,
          callbackURL: '/studio/dashboard',
        },
      });

      // TODO: redirect based on user role

      if (res.redirect && res.url) {
        redirect(res.url);
      }
    } catch (e: unknown) {
      if (e instanceof APIError) {
        return { status: 'error', message: e.message };
      }

      throw e;
    }

    return { status: 'success', message: 'Sign in successful' };
  });
};
