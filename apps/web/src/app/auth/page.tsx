import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React from 'react';

function Auth() {
  return (
    <div className="flex h-dvh">
      <div className="flex-2/3 p-5 h-full">
        <div className="h-full rounded-2xl bg-gray-200 relative overflow-hidden">
          <Image
            alt="3d camera render"
            className="object-cover object-center"
            src="/auth-banner.jpg"
            fill
          />
        </div>
      </div>
      <div className="flex-1/2 p-5">
        <div className="w-md m-auto">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="logo"
            className="rounded-md m-auto mt-20"
          />
          <div className="text-center mt-15 mb-15">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p>Enter your email and password to access your account</p>
          </div>
          <form>
            <div className="flex flex-col gap-3 mb-6">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="e.g email@example.com"
              />
            </div>
            <div className="flex flex-col gap-3 mb-6">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <Button className="w-full mb-6">Sign In</Button>
          </form>
          <div className="w-full h-[1px] bg-gray-200 relative mb-6">
            <div className="absolute left-1/2 bottom-1/2 leading-1 bg-white text-gray-300 size-5 translate-y-1/2 -translate-x-1/2 pb-1 flex items-center justify-center">
              or
            </div>
          </div>
          <Button className="w-full">Sign In with Google</Button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
