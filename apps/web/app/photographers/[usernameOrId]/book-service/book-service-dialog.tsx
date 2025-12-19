'use client';

import { CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Service } from '@/entities/models/service';
import { UserProfile } from '@/entities/models/user';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';

import BookServiceForm, { NewOrderDetails } from './book-service-form';

type BookServiceDialogProps = {
  children: React.ReactNode;
  userEmail: string;
  username: string;
  userId: string;
  service: Service;
  photographerProfile: UserProfile;
  photographerId: string;
};

function BookServiceDialog(props: BookServiceDialogProps) {
  const {
    children,
    userEmail,
    username,
    service,
    photographerProfile,
    userId,
    photographerId,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [orderDetails, setOrderDetails] = useState<NewOrderDetails | null>(
    null,
  );

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      setOrderDetails(null);
    }, 1000);
  };

  const t = useTranslations('photographerProfile.bookService');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={handleClose}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        {orderDetails !== null ? (
          <div className="flex flex-col items-center justify-center gap-4 text-center py-10">
            <div className="sr-only">
              <DialogHeader>
                <DialogTitle>{t('title')}</DialogTitle>
                <DialogDescription>{t('description')}</DialogDescription>
              </DialogHeader>
            </div>
            <div className="flex items-center justify-center size-20 bg-green-500/10 rounded-full">
              <CheckIcon className="size-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold">{t('success.title')}</h1>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              {t('success.description', {
                photographerName: orderDetails?.photographerName,
              })}
            </p>
            <div className="flex items-center justify-center gap-2">
              <Button onClick={handleClose} variant="outline">
                {t('success.close')}
              </Button>
              <Link
                href="/my-bookings"
                className={buttonVariants({ variant: 'default' })}
              >
                {t('success.viewBookings')}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t('title')}</DialogTitle>
              <DialogDescription>{t('description')}</DialogDescription>
            </DialogHeader>
            <BookServiceForm
              onSuccess={(orderDetails) => setOrderDetails(orderDetails)}
              service={service}
              photographerId={photographerId}
              photographerProfile={photographerProfile}
              clientInfo={{ username, userEmail, id: userId }}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BookServiceDialog;
