'use client';

import { useTranslations } from 'next-intl';

import { Service } from '@/entities/models/service';
import { UserProfile } from '@/entities/models/user';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';

import BookServiceForm from './book-service-form';

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

  const t = useTranslations('photographerProfile.bookService');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <BookServiceForm
          service={service}
          photographerId={photographerId}
          photographerProfile={photographerProfile}
          clientInfo={{ username, userEmail, id: userId }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default BookServiceDialog;
