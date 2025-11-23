'use client';

import { Button } from '@shotly/ui/components/button';
import { MessageSquareIcon, StarIcon } from 'lucide-react';
import React from 'react';
import LeaveReviewDialog from './leave-review-dialog';
import { useTranslations } from 'next-intl';

type BookingActionsProps = {
  status: 'completed' | 'cancelled' | 'pending' | 'confirmed';
  onCancel: () => void;
  onLeaveReview: () => void;
  onMessage: () => void;
};

function BookingActions({ status }: BookingActionsProps) {
  const t = useTranslations('myBookings.actions');

  return (
    <>
      <Button variant="outline" className="rounded-full">
        <MessageSquareIcon /> {t('messagePhotographer')}
      </Button>
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
