'use client';

import React, { useActionState } from 'react';
import { Label } from '@shotly/ui/components/label';
import { Input } from '@shotly/ui/components/input';
import { Button } from '@shotly/ui/components/button';
import { GoogleIcon } from '@shotly/ui/components/google-icon';
import Link from 'next/link';
import { signInWithGoogle, signUp } from '../actions';

const SignUpForm = () => {
  const [state, formAction, pending] = useActionState(signUp, {});
  const { validationErrors, formError } = state ?? {};
  const { fieldErrors } = validationErrors ?? {};

  return (
    <div>
      <div className="text-center mt-10 mb-15">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-sm">
          Enter your personal data to create your account.
        </p>
      </div>
      {formError && (
        <div className="mb-5 flex items-center space-x-2 text-red-500 text-sm mt-1 bg-red-50 border-red-200 rounded-md p-3">
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <span>{formError}</span>
        </div>
      )}
      <form action={formAction}>
        <div className="flex gap-6">
          <div className="flex flex-col gap-3 mb-6 flex-1/2">
            <Label htmlFor="email">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="e.g John"
              error={fieldErrors?.firstName?.toString() ?? ''}
            />
          </div>
          <div className="flex flex-col gap-3 mb-6 flex-1/2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              name="lastName"
              id="lastName"
              placeholder="e.g Francisco"
              error={fieldErrors?.lastName?.toString() ?? ''}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="e.g email@example.com"
            error={fieldErrors?.email?.toString() ?? ''}
          />
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            error={fieldErrors?.password?.toString() ?? ''}
          />
        </div>
        <Button loading={pending} className="w-full mb-8 font-bold" size="lg">
          Sign Up
        </Button>
      </form>
      <div className="w-full h-[1px] bg-gray-200 relative mb-8">
        <div className="absolute text-sm left-1/2 bottom-1/2 leading-1 bg-background text-foreground size-8 translate-y-1/2 -translate-x-1/2 p-1 flex items-center justify-center">
          Or
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full mb-8"
        size="lg"
        onClick={signInWithGoogle}
      >
        <GoogleIcon /> Sign Up with Google
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="font-bold text-foreground">
          Log In
        </Link>
      </p>
    </div>
  );
};

export { SignUpForm };
