'use client';

import { Logo } from '@shotly/ui/components/logo';
import React from 'react';
import { signUp } from './sing-up.action';
import { Label } from '@shotly/ui/components/label';
import { Input } from '@shotly/ui/components/input';
import { Button } from '@shotly/ui/components/button';
import { useFormStatus } from 'react-dom';
import { GoogleIcon } from '@shotly/ui/components/google-icon';
import Link from 'next/link';

const SignUpForm = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className="text-center mt-10 mb-15">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-sm">
          Enter your personal data to create your account.
        </p>
      </div>
      <form action={signUp}>
        <div className="flex gap-6">
          <div className="flex flex-col gap-3 mb-6 flex-1/2">
            <Label htmlFor="email">First Name</Label>
            <Input id="firstName" name="firstName" placeholder="e.g John" />
          </div>
          <div className="flex flex-col gap-3 mb-6 flex-1/2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input name="lastName" id="lastName" placeholder="e.g Francisco" />
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="e.g email@example.com"
          />
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" className="w-full mb-8 font-bold" size="lg">
          Sign Up {pending && 'Loading...'}
        </Button>
      </form>
      <div className="w-full h-[1px] bg-gray-200 relative mb-8">
        <div className="absolute text-sm left-1/2 bottom-1/2 leading-1 bg-background text-foreground size-8 translate-y-1/2 -translate-x-1/2 p-1 flex items-center justify-center">
          Or
        </div>
      </div>
      <Button variant="outline" className="w-full mb-8" size="lg">
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
