'use client';

import { EyeIcon, MessageSquareIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';

import { Order, OrderStatus } from '@/entities/models/order';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import { ConfirmationDialog } from '@shotly/ui/components/confirmation-dialog';
import { cn } from '@shotly/ui/lib/utils';

import { cancelOrderAction } from './actions';
import PostReviewDialog from './review-dialog/post-review-dialog';

type BookingActionsProps = {
  order: Order;
};

function BookingActions({ order }: BookingActionsProps) {
  const t = useTranslations('myBookings.actions');
  const [isCancelling, startCancellingTransition] = useTransition();

  const handleCancelOrder = async () => {
    startCancellingTransition(async () => {
      await cancelOrderAction(order.id);
    });
  };

  return (
    <>
      <Link
        href={`mailto:${order.photographer.email}`}
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        <MessageSquareIcon /> {t('messagePhotographer')}
      </Link>
      {order.status === OrderStatus.COMPLETED && (
        <PostReviewDialog order={order} isReadOnly={!!order.review}>
          {order.review ? (
            <Button>
              <EyeIcon /> {t('seeReview')}
            </Button>
          ) : (
            <Button>
              <StarIcon /> {t('leaveReview')}
            </Button>
          )}
        </PostReviewDialog>
      )}
      {order.status === OrderStatus.PENDING && (
        <ConfirmationDialog
          title="Cancel Booking"
          description={`Are you sure you want to cancel booking ${order.displayId}?`}
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
