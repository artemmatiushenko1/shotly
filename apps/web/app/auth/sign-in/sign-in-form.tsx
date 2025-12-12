'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useActionState, useId } from 'react';

import { FormActionState } from '@/utils/server-actions';

import { Button } from '@shotly/ui/components/button';
import { GoogleIcon } from '@shotly/ui/components/google-icon';
import { Input } from '@shotly/ui/components/input';
import { Label } from '@shotly/ui/components/label';

import {
  signInWithGoogleAction,
  signInWithPasswordAction,
} from './sign-in-form.actions';
import { SignInWithPasswordFormValues } from './sign-in-form.schema';

const INITIAL_STATE: FormActionState<SignInWithPasswordFormValues> = {
  status: 'idle',
};

const SignInForm = () => {
  const t = useTranslations('auth.signIn');

  const [state, formAction, pending] = useActionState(
    signInWithPasswordAction,
    INITIAL_STATE,
  );

  const emailId = useId();
  const passwordId = useId();

  const { errors, inputs } = state;

  return (
    <div>
      <div className="text-left mt-10 mb-15">
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
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor={emailId}>{t('fields.email.label')}</Label>
          <Input
            required
            type="email"
            id={emailId}
            name="email"
            placeholder={t('fields.email.placeholder')}
            error={errors?.email?.join(', ')}
            defaultValue={inputs?.email}
          />
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor={passwordId}>{t('fields.password.label')}</Label>
          <Input
            required
            type="password"
            id={passwordId}
            name="password"
            placeholder={t('fields.password.placeholder')}
            error={errors?.password?.join(', ')}
            defaultValue={inputs?.password}
          />
        </div>
        <Button loading={pending} size="lg" className="w-full mb-8 font-bold">
          {t('submitButton')}
        </Button>
        <div className="w-full h-[1px] bg-gray-200 relative mb-8">
          <div className="absolute text-sm left-1/2 bottom-1/2 leading-1 bg-card text-foreground size-8 translate-y-1/2 -translate-x-1/2 p-1 flex items-center justify-center">
            {t('divider')}
          </div>
        </div>
      </form>
      <Button
        variant="outline"
        className="w-full mb-8"
        size="lg"
        onClick={signInWithGoogleAction}
      >
        <GoogleIcon /> {t('googleButton')}
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        {t('footer.text')}{' '}
        <Link href="/auth/sign-up" className="font-bold text-foreground">
          {t('footer.link')}
        </Link>
      </p>
    </div>
  );
};

export { SignInForm };
