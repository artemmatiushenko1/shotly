'use client';

import { MessageSquareIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { OrderStatus } from '@/entities/models/order';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';

import LeaveReviewDialog from './leave-review-dialog';

type BookingActionsProps = {
  status: OrderStatus;
  onCancel: () => void;
  onLeaveReview: () => void;
  photographerEmail: string;
};

function BookingActions({ status, photographerEmail }: BookingActionsProps) {
  const t = useTranslations('myBookings.actions');

  return (
    <>
      <Link
        href={`mailto:${photographerEmail}`}
        className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full')}
      >
        <MessageSquareIcon /> {t('messagePhotographer')}
      </Link>
      {status === 'completed' && (
        <LeaveReviewDialog>
          <Button className="rounded-full">
            <StarIcon /> {t('leaveReview')}
          </Button>
        </LeaveReviewDialog>
      )}
      {status === 'pending' && (
        <Button variant="destructive" className="rounded-full">
          {t('cancelBooking')}
        </Button>
      )}
    </>
  );
}

export default BookingActions;
