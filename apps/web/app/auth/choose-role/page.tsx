'use client';

import { CameraIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useId } from 'react';

import { Role } from '@/entities/models/user';
import { FormActionState } from '@/utils/server-actions';

import { Button } from '@shotly/ui/components/button';
import { Label } from '@shotly/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@shotly/ui/components/radio-group';

import { updateUserRoleAction } from './choose-role-form.actions';
import { UpdateUserRoleFormValues } from './choose-role-form.schema';

const INITIAL_STATE: FormActionState<UpdateUserRoleFormValues> = {
  status: 'idle',
  inputs: {
    role: Role.CUSTOMER,
  },
};

function ChooseRolePage() {
  const id = useId();
  const t = useTranslations('auth.onboarding');

  const [state, formAction, pending] = useActionState(
    updateUserRoleAction,
    INITIAL_STATE,
  );

  const { inputs } = state;

  return (
    <div>
      <div className="text-center mt-10 mb-15">
        <h1 className="text-3xl font-bold text-left mb-2">{t('title')}</h1>
        <p className="text-sm text-left text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>
      <form className="space-y-4" action={formAction}>
        <h2 className="mb-4 text-lg font-medium">{t('heading')}</h2>
        <RadioGroup
          name="role"
          defaultValue={inputs?.role}
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
              <p>{t('roles.customer.label')}</p>
              <p
                id={`${id}-1-description`}
                className="text-muted-foreground text-left text-xs"
              >
                {t('roles.customer.description')}
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
              <div>{t('roles.photographer.label')}</div>
              <p
                id={`${id}-2-description`}
                className="text-muted-foreground text-left text-xs"
              >
                {t('roles.photographer.description')}
              </p>
            </div>
          </Label>
        </RadioGroup>
        <Button type="submit" className="w-full" loading={pending}>
          {t('continueButton')}
        </Button>
      </form>
    </div>
  );
}

export default ChooseRolePage;
