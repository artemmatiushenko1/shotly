'use client';

import { Button } from '@shotly/ui/components/button';
import { Card } from '@shotly/ui/components/card';
import { DatePicker } from '@shotly/ui/components/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { Input } from '@shotly/ui/components/input';
import { Label } from '@shotly/ui/components/label';
import { Separator } from '@shotly/ui/components/separator';
import { Textarea } from '@shotly/ui/components/textarea';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type BookServiceDialogProps = {
  children: React.ReactNode;
};

function BookServiceDialog({ children }: BookServiceDialogProps) {
  const t = useTranslations('photographerProfile.bookService');
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
        <Card className="shadow-none p-2 flex-row items-center gap-4">
          <div className="size-[60px] overflow-hidden rounded-sm shrink-0">
            <Image
              unoptimized
              src="https://placehold.co/600x400"
              alt={t('serviceImageAlt')}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold">Full Day Wedding Coverage</h3>
            <p className="text-xs text-muted-foreground">
              Full coverage capturing candid and posed moments.
            </p>
          </div>
          <div>
            <span className="text-md font-bold">грн 8,000</span>{' '}
            <span className="text-xs text-muted-foreground text-nowrap">
              {t('priceUnit')}
            </span>
          </div>
        </Card>
        <div>
          <Label htmlFor="name" className="mb-2">
            {t('fields.name.label')}
          </Label>
          <Input
            readOnly
            disabled
            name="name"
            id="name"
            value="John Doe"
            placeholder={t('fields.name.placeholder')}
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2">
            {t('fields.email.label')}
          </Label>
          <Input
            readOnly
            disabled
            name="email"
            id="email"
            value="john.doe@example.com"
            placeholder={t('fields.email.placeholder')}
          />
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="mb-2">
              {t('fields.date.label')}
            </Label>
            <DatePicker
              value={new Date()}
              onChange={(date: Date | undefined) => {
                console.log(date);
              }}
              id="date"
              name="date"
              placeholder={t('fields.date.placeholder')}
            />
          </div>
          <div>
            <Label htmlFor="duration" className="mb-2">
              {t('fields.duration.label')}
            </Label>
            <Input
              type="number"
              name="duration"
              id="duration"
              placeholder={t('fields.duration.placeholder')}
              min={1}
              max={10}
              step={1}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="notes" className="mb-2">
            {t('fields.notes.label')}
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
