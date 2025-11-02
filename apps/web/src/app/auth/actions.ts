'use server';

import { auth } from '@/lib/auth/auth';
import { APIError } from 'better-auth/api';
import { redirect } from 'next/navigation';
import z from 'zod';

export const signInWithGoogle = async () => {
  const res = await auth.api.signInSocial({
    body: {
      provider: 'google',
      callbackURL: '/',
    },
  });

  if (res.redirect && res.url) {
    redirect(res.url);
  }
};

const signInWithPasswordSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }),
});

type SignInWithPasswordValidationErrors = z.core.$ZodFlattenedError<
  z.infer<typeof signInWithPasswordSchema>
>;

export const signInWithPassword = async (
  _: {
    formError?: string;
    validationErrors?: SignInWithPasswordValidationErrors;
  },
  formData: FormData,
) => {
  const validatedFields = signInWithPasswordSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: z.flattenError(validatedFields.error),
    };
  }

  let redirectUrl = '';

  try {
    const { data } = validatedFields;

    const res = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        callbackURL: '/',
      },
    });

    if (res.redirect && res.url) {
      redirectUrl = res.url;
    }
  } catch (e: unknown) {
    if (e instanceof APIError) {
      return { formError: e.message };
    }

    return {};
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return {};
};

// TODO: create, validated action https://github.com/nextjs/saas-starter/blob/main/app/(login)/actions.ts
// return formData from action and then use state to set default values to form fields, so it's not reset
const signUpSchema = z.object({
  firstName: z.string().nonempty({ error: 'First name is required' }),
  lastName: z.string().nonempty({ error: 'Last name is required' }),
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }),
});

type ValidationErrors = z.core.$ZodFlattenedError<z.infer<typeof signUpSchema>>;

export const signUp = async (
  _: { formError?: string; validationErrors?: ValidationErrors },
  formData: FormData,
) => {
  const validatedFields = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  });

  if (!validatedFields.success) {
    return {
      validationErrors: z.flattenError(validatedFields.error),
    };
  }

  const { data } = validatedFields;

  let redirectUrl = '';

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      },
    });

    if (response.token) {
      redirectUrl = '/';
    }
  } catch (e: unknown) {
    if (e instanceof APIError) {
      return { formError: e.message };
    }
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return {};
};
