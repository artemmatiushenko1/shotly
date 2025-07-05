import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

function AcceptInvite() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className="text-center mt-10 mb-15">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="text-sm">
          You&apos;ve been invited to join Shotly as a photographer. Please
          enter your email to get started.
        </p>
      </div>
      <form>
        <div className="flex flex-col gap-3 mb-6">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="e.g email@example.com" />
        </div>
        <Button className="w-full mb-8 font-bold" size="lg">
          Send Verification Code
        </Button>
        <p className="text-muted-foreground text-sm text-center">
          We&apos;ll send a verification code to your email to confirm your
          identity.
        </p>
      </form>
    </div>
  );
}

export default AcceptInvite;
