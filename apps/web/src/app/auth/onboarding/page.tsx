'use client';

import { Button } from '@shotly/ui/components/button';
import { Label } from '@shotly/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@shotly/ui/components/radio-group';
import { CameraIcon, UserIcon } from 'lucide-react';
import { useActionState, useId } from 'react';
import { updateUserRole } from './actions';
import { Role } from '@/domain/user';

function OnboardingPage() {
  const id = useId();

  const [, formAction, pending] = useActionState(updateUserRole, {});

  return (
    <div>
      <div className="text-center mt-10 mb-15">
        <h1 className="text-3xl font-bold text-left mb-2">
          Congrats! Your account is created.
        </h1>
        <p className="text-sm text-left text-muted-foreground">
          What brings you here?
        </p>
      </div>
      <form className="space-y-4" action={formAction}>
        <h2 className="mb-4 text-lg font-medium">I am a...</h2>
        <RadioGroup
          name="role"
          defaultValue={Role.CUSTOMER}
          className="w-full justify-items-center sm:grid-cols-2"
        >
          <Label
            htmlFor={`${id}-1`}
            className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full flex-col items-start gap-3 rounded-md border p-4 shadow-xs outline-none"
          >
            <RadioGroupItem
              value={Role.CUSTOMER}
              id={`${id}-1`}
              className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3 absolute right-5 top-5"
              aria-describedby={`${id}-1-description`}
              aria-label="plan-radio-basic"
            />
            <div className="grid grow justify-items-start gap-3">
              <UserIcon />
              <p>Customer</p>
              <p
                id={`${id}-1-description`}
                className="text-muted-foreground text-left text-xs"
              >
                I want to search, book, and manage my photo sessions.
              </p>
            </div>
          </Label>
          <Label
            htmlFor={`${id}-2`}
            className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full flex-col items-start gap-3 rounded-md border p-4 shadow-xs outline-none"
          >
            <RadioGroupItem
              value={Role.PHOTOGRAPHER}
              id={`${id}-2`}
              className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3 absolute right-5 top-5"
              aria-describedby={`${id}-2-description`}
              aria-label="plan-radio-premium"
            />
            <div className="grid grow justify-items-start gap-3">
              <CameraIcon />
              <div>Photographer</div>
              <p
                id={`${id}-2-description`}
                className="text-muted-foreground text-left text-xs"
              >
                I want to showcase my portfolio and get new clients.
              </p>
            </div>
          </Label>
        </RadioGroup>
        <Button type="submit" className="w-full" loading={pending}>
          Continue
        </Button>
      </form>
    </div>
  );
}

export default OnboardingPage;
