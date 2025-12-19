'use client';

import { ClockIcon, MinusIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { Service } from '@/entities/models/service';
import { UserProfile } from '@/entities/models/user';

import { Button } from '@shotly/ui/components/button';
import { ButtonGroup } from '@shotly/ui/components/button-group';
import { Card } from '@shotly/ui/components/card';
import { DatePicker } from '@shotly/ui/components/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { Input } from '@shotly/ui/components/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@shotly/ui/components/input-group';
import { Label } from '@shotly/ui/components/label';
import { Separator } from '@shotly/ui/components/separator';
import { Textarea } from '@shotly/ui/components/textarea';

type BookServiceDialogProps = {
  children: React.ReactNode;
  userEmail: string;
  username: string;
  service: Service;
  photographerProfile: UserProfile;
};

const MAX_DURATION = 8;
const MIN_DURATION = 1;
const DEFAULT_DURATION_CHANGE_STEP = 1;

function BookServiceDialog(props: BookServiceDialogProps) {
  const { children, userEmail, username, service, photographerProfile } = props;

  const [duration, setDuration] = useState(MIN_DURATION);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const t = useTranslations('photographerProfile.bookService');

  const locale = useLocale();

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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
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
        <form>
          <Label htmlFor="name" className="mb-2">
            {t('fields.name.label')}
          </Label>
          <Input
            readOnly
            disabled
            name="name"
            id="name"
            value={username}
            placeholder={t('fields.name.placeholder')}
          />
        </form>
        <div>
          <Label htmlFor="email" className="mb-2">
            {t('fields.email.label')}
          </Label>
          <Input
            readOnly
            disabled
            name="email"
            id="email"
            value={userEmail}
            placeholder={t('fields.email.placeholder')}
          />
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <Label htmlFor="date" className="mb-2">
              {t('fields.date.label')}
            </Label>
            <DatePicker
              value={date}
              onChange={setDate}
              locale={{ code: locale }}
              id="date"
              name="date"
              disabled={{ before: new Date() }}
              placeholder={t('fields.date.placeholder')}
            />
          </div>
          <div>
            <Label htmlFor="duration" className="mb-2">
              {t('fields.duration.label')}
              <span className="text-xs text-muted-foreground">
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
                  name="duration"
                  id="duration"
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
                variant="outline"
                onClick={() => updateDuration(DEFAULT_DURATION_CHANGE_STEP)}
              >
                <PlusIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => updateDuration(-DEFAULT_DURATION_CHANGE_STEP)}
              >
                <MinusIcon className="size-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div>
          <Label htmlFor="notes" className="mb-2">
            {t('fields.notes.label')}
            <span className="text-xs text-muted-foreground">
              ({t('fields.notes.optional')})
            </span>
          </Label>
          <div className="space-y-2">
            <Textarea
              showCharsCount
              maxChars={500}
              className="no-resize"
              rows={5}
              name="notes"
              id="notes"
              placeholder={t('fields.notes.placeholder')}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full">{t('submitButton')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookServiceDialog;
