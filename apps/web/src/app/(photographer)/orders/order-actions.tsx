'use client';

import { Button } from '@shotly/ui/components/button';
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

type OrderActionsProps = {
  status: 'completed' | 'cancelled' | 'pending' | 'confirmed';
};

function OrderActions(props: OrderActionsProps) {
  const { status } = props;
  const t = useTranslations('orders.actions');

  if (status === 'pending') {
    return (
      <>
        <Button
          variant="outline"
          className="rounded-full border-destructive text-destructive bg-transparent hover:bg-destructive/10 hover:text-destructive"
        >
          {t('reject')}
        </Button>
        <Button className="rounded-full bg-green-500 hover:bg-green-500/90">
          <CheckIcon /> {t('accept')}
        </Button>
      </>
    );
  }

  if (status === 'confirmed') {
    return (
      <Button className="rounded-full">
        <CheckIcon /> {t('complete')}
      </Button>
    );
  }

  return null;
}

export default OrderActions;
