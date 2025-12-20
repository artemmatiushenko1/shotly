'use client';

import { MessageSquareIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';

import { OrderStatus } from '@/entities/models/order';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import { ConfirmationDialog } from '@shotly/ui/components/confirmation-dialog';
import { cn } from '@shotly/ui/lib/utils';

import { cancelOrderAction } from './actions';
import LeaveReviewDialog from './leave-review-dialog';

type BookingActionsProps = {
  status: OrderStatus;
  orderDisplayId: string;
  orderId: string;
  onCancel: () => void;
  onLeaveReview: () => void;
  photographerEmail: string;
};

function BookingActions({
  status,
  photographerEmail,
  orderDisplayId,
  onCancel,
  orderId,
}: BookingActionsProps) {
  const t = useTranslations('myBookings.actions');
  const [isCancelling, startCancellingTransition] = useTransition();

  const handleCancelOrder = async () => {
    startCancellingTransition(async () => {
      await cancelOrderAction(orderId);
      onCancel();
    });
  };

  return (
    <>
      <Link
        href={`mailto:${photographerEmail}`}
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        <MessageSquareIcon /> {t('messagePhotographer')}
      </Link>
      {status === 'completed' && (
        <LeaveReviewDialog>
          <Button>
            <StarIcon /> {t('leaveReview')}
          </Button>
        </LeaveReviewDialog>
      )}
      {status === 'pending' && (
        <ConfirmationDialog
          title="Cancel Booking"
          description={`Are you sure you want to cancel booking ${orderDisplayId}?`}
          onConfirm={handleCancelOrder}
          actionSeverity="caution"
        >
          <Button loading={isCancelling} variant="destructive">
            {t('cancelBooking')}
          </Button>
        </ConfirmationDialog>
      )}
    </>
  );
}

export default BookingActions;
