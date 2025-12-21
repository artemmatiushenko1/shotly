'use client';

import { CheckIcon, MessageSquareIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { OrderStatus } from '@/entities/models/order';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';

import {
  acceptOrderAction,
  completeOrderAction,
  rejectOrderAction,
} from './actions';

type OrderActionsProps = {
  orderId: string;
  status: OrderStatus;
  clientEmail: string;
};

function OrderActions(props: OrderActionsProps) {
  const { status, orderId, clientEmail } = props;

  const t = useTranslations('orders.actions');

  const [isAcceptingOrder, startAcceptOrderTransition] = useTransition();
  const [isRejectingOrder, startRejectOrderTransition] = useTransition();
  const [isCompletingOrder, startCompleteOrderTransition] = useTransition();

  const handleCompleteOrder = async () => {
    startCompleteOrderTransition(async () => {
      await completeOrderAction(orderId);
    });
  };

  const handleAcceptOrder = async () => {
    startAcceptOrderTransition(async () => {
      await acceptOrderAction(orderId);
    });
  };

  const handleRejectOrder = async () => {
    startRejectOrderTransition(async () => {
      await rejectOrderAction(orderId);
    });
  };

  if (status === OrderStatus.PENDING) {
    return (
      <>
        <Button
          loading={isRejectingOrder}
          onClick={handleRejectOrder}
          variant="outline"
          className="border-destructive text-destructive bg-transparent hover:bg-destructive/10 hover:text-destructive"
        >
          {t('reject')}
        </Button>
        <Button
          loading={isAcceptingOrder}
          onClick={handleAcceptOrder}
          className="bg-green-500 hover:bg-green-500/90"
        >
          <CheckIcon /> {t('accept')}
        </Button>
      </>
    );
  }

  if (status === OrderStatus.CONFIRMED) {
    return (
      <>
        <Link
          href={`mailto:${clientEmail}`}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <MessageSquareIcon /> {t('messageClient')}
        </Link>
        <Button loading={isCompletingOrder} onClick={handleCompleteOrder}>
          <CheckIcon /> {t('complete')}
        </Button>
      </>
    );
  }

  return null;
}

export default OrderActions;
