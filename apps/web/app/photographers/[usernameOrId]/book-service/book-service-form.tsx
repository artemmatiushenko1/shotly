'use client';

import { ClockIcon, MinusIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import React, { useActionState, useId, useState } from 'react';

import { Service } from '@/entities/models/service';
import { UserProfile } from '@/entities/models/user';

import { Button } from '@shotly/ui/components/button';
import { ButtonGroup } from '@shotly/ui/components/button-group';
import { Card } from '@shotly/ui/components/card';
import { DatePicker } from '@shotly/ui/components/date-picker';
import { Input } from '@shotly/ui/components/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@shotly/ui/components/input-group';
import { Label } from '@shotly/ui/components/label';
import { Separator } from '@shotly/ui/components/separator';
import { Textarea } from '@shotly/ui/components/textarea';

import { createOrderAction } from './book-service-form.actions';
import {
  MAX_DURATION,
  MAX_NOTES_LENGTH,
  MIN_DURATION,
} from './book-service-form.schema';

const DEFAULT_DURATION_CHANGE_STEP = 1;

type BookServiceFormProps = {
  clientInfo: {
    username: string;
    userEmail: string;
    id: string;
  };
  service: Service;
  photographerProfile: UserProfile;
  photographerId: string;
};

function BookServiceForm(props: BookServiceFormProps) {
  const { service, photographerProfile, clientInfo, photographerId } = props;

  const t = useTranslations('photographerProfile.bookService');
  const locale = useLocale();

  const [formState, formAction, isPending] = useActionState(createOrderAction, {
    status: 'idle',
  });

  const [duration, setDuration] = useState(MIN_DURATION);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const nameId = useId();
  const emailId = useId();
  const dateId = useId();
  const durationId = useId();
  const notesId = useId();

  const updateDuration = (step: number) => {
    const newDuration = duration + step;

    if (newDuration < MIN_DURATION) {
      setDuration(MIN_DURATION);
    } else if (newDuration > MAX_DURATION) {
      setDuration(MAX_DURATION);
    } else {
      setDuration(newDuration);
    }
  };

  const { errors, inputs } = formState;

  console.log({ errors });

  return (
    <form action={formAction} className="flex gap-4 flex-col">
      <Card className="shadow-none p-2 flex-row items-center gap-4">
        <div className="size-[65px] overflow-hidden rounded-sm shrink-0">
          <Image
            width={110}
            height={110}
            alt={t('serviceImageAlt')}
            src={service.coverImageUrl}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="overflow-hidden">
          <h3 className="text-sm font-bold">{service.name}</h3>
          <p className="text-xs text-muted-foreground truncate max-w-[260px] mb-2">
            {service.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="size-[20px] overflow-hidden rounded-full shrink-0">
              <Image
                width={20}
                height={20}
                className="object-cover w-full h-full"
                src={photographerProfile.profileImageUrl ?? ''}
                alt={photographerProfile.name}
              />
            </div>
            <p className="text-xs truncate max-w-[260px]">
              {photographerProfile.name}
            </p>
          </div>
        </div>
        <p className="text-right ml-auto">
          <span className="text-md font-bold">
            {service.price} {service.currency.toUpperCase()}
          </span>{' '}
          <span className="text-xs text-muted-foreground text-nowrap">
            <br />
            {t('priceUnit')}
          </span>
        </p>
      </Card>
      <div>
        <Label htmlFor={nameId} className="mb-2">
          {t('fields.name.label')}
        </Label>
        <Input
          readOnly
          disabled
          id={nameId}
          value={clientInfo.username}
          placeholder={t('fields.name.placeholder')}
        />
      </div>
      <div>
        <Label htmlFor={emailId} className="mb-2">
          {t('fields.email.label')}
        </Label>
        <Input
          readOnly
          disabled
          id={emailId}
          value={clientInfo.userEmail}
          placeholder={t('fields.email.placeholder')}
        />
      </div>
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <Label htmlFor={dateId} className="mb-2">
            {t('fields.date.label')}
          </Label>
          <DatePicker
            id={dateId}
            value={date}
            onChange={setDate}
            locale={{ code: locale }}
            name="bookingDate"
            disabled={{ before: new Date() }}
            error={errors?.bookingDate?.join(', ')}
            placeholder={t('fields.date.placeholder')}
          />
        </div>
        <div>
          <Label htmlFor={durationId} className="mb-2">
            {t('fields.duration.label')}
            <span className="text-xs text-muted-foreground leading-0">
              ({t('fields.duration.unit')})
            </span>
          </Label>
          <ButtonGroup className="w-full gap-1/2">
            <InputGroup>
              <InputGroupAddon>
                <ClockIcon />
              </InputGroupAddon>
              <InputGroupInput
                type="number"
                name="hours"
                id={durationId}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder={t('fields.duration.placeholder')}
                min={MIN_DURATION}
                max={MAX_DURATION}
                step={DEFAULT_DURATION_CHANGE_STEP}
                className="rounded-r-none relative [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </InputGroup>
            <Button
              type="button"
              variant="outline"
              onClick={() => updateDuration(DEFAULT_DURATION_CHANGE_STEP)}
            >
              <PlusIcon className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => updateDuration(-DEFAULT_DURATION_CHANGE_STEP)}
            >
              <MinusIcon className="size-4" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div>
        <Label htmlFor={notesId} className="mb-2">
          {t('fields.notes.label')}
          <span className="text-xs text-muted-foreground">
            ({t('fields.notes.optional')})
          </span>
        </Label>
        <div className="space-y-2">
          <Textarea
            showCharsCount
            maxChars={MAX_NOTES_LENGTH}
            className="no-resize"
            rows={5}
            name="notes"
            id={notesId}
            defaultValue={inputs?.notes ?? ''}
            placeholder={t('fields.notes.placeholder')}
            error={errors?.notes?.join(', ')}
          />
        </div>
      </div>
      <input type="hidden" name="clientId" defaultValue={clientInfo.id} />
      <input type="hidden" name="serviceId" defaultValue={service.id} />
      <input
        type="hidden"
        name="photographerId"
        defaultValue={photographerId}
      />
      <Button type="submit" className="w-full" loading={isPending}>
        {t('submitButton')}
      </Button>
    </form>
  );
}

export default BookServiceForm;
