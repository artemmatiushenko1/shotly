'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useActionState } from 'react';

import { FormActionState } from '@/utils/server-actions';

import { Button } from '@shotly/ui/components/button';
import { GoogleIcon } from '@shotly/ui/components/google-icon';
import { Input } from '@shotly/ui/components/input';
import { Label } from '@shotly/ui/components/label';

import { signUpAction, signUpWithGoogleAction } from './sign-up-form.actions';
import { SignUpFormValues } from './sign-up-form.schema';

const INITIAL_STATE: FormActionState<SignUpFormValues> = {
  status: 'idle',
};

const SignUpForm = () => {
  const t = useTranslations('auth.signUp');

  const [state, formAction, pending] = useActionState(
    signUpAction,
    INITIAL_STATE,
  );
  const { errors, inputs } = state;

  return (
    <div>
      <div className="text-left mt-10 mb-15 ">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-sm text-muted-foreground">{t('description')}</p>
      </div>
      {state.message && state.status === 'error' && (
        <div className="mb-5 flex items-center space-x-2 text-red-500 text-sm mt-1 bg-red-50 border-red-200 rounded-md p-3">
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <span>{state.message}</span>
        </div>
      )}
      <form action={formAction}>
        <div className="flex gap-6">
          <div className="flex flex-col gap-3 mb-6 flex-1/2">
            <Label htmlFor="firstName">{t('fields.firstName.label')}</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder={t('fields.firstName.placeholder')}
              error={errors?.firstName?.join(', ')}
              defaultValue={inputs?.firstName}
            />
          </div>
          <div className="flex flex-col gap-3 mb-6 flex-1/2">
            <Label htmlFor="lastName">{t('fields.lastName.label')}</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder={t('fields.lastName.placeholder')}
              error={errors?.lastName?.join(', ')}
              defaultValue={inputs?.lastName}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="email">{t('fields.email.label')}</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder={t('fields.email.placeholder')}
            error={errors?.email?.join(', ')}
            defaultValue={inputs?.email}
          />
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="password">{t('fields.password.label')}</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder={t('fields.password.placeholder')}
            error={errors?.password?.join(', ')}
            defaultValue={inputs?.password}
          />
        </div>
        <Button loading={pending} className="w-full mb-8 font-bold" size="lg">
          {t('submitButton')}
        </Button>
      </form>
      <div className="w-full h-[1px] bg-gray-200 relative mb-8">
        <div className="absolute text-sm left-1/2 bottom-1/2 leading-1 bg-card text-foreground size-8 translate-y-1/2 -translate-x-1/2 p-1 flex items-center justify-center">
          {t('divider')}
        </div>
      </div>
      <Button
        size="lg"
        variant="outline"
        className="w-full mb-8"
        onClick={signUpWithGoogleAction}
      >
        <GoogleIcon /> {t('googleButton')}
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        {t('footer.text')}{' '}
        <Link href="/auth/sign-in" className="font-bold text-foreground">
          {t('footer.link')}
        </Link>
      </p>
    </div>
  );
};

export { SignUpForm };
