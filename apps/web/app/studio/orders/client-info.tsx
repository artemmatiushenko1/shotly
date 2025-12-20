'use client';

import { UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { OrderStatus } from '@/entities/models/order';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import { Skeleton } from '@shotly/ui/components/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';

type ClientInfoProps = {
  clientName: string;
  clientEmail: string;
  orderStatus: OrderStatus;
};

function ClientInfo({ clientName, clientEmail, orderStatus }: ClientInfoProps) {
  const t = useTranslations('orders.clientInfo');

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{t('label')}</p>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          {orderStatus === OrderStatus.PENDING ||
          orderStatus === OrderStatus.CANCELLED ? (
            <Tooltip>
              <TooltipTrigger>
                <Skeleton animation="none" className="w-15 h-3 mb-1" />
                <Skeleton animation="none" className="w-10 h-3" />
              </TooltipTrigger>
              <TooltipContent>{t('revealTooltip')}</TooltipContent>
            </Tooltip>
          ) : (
            <>
              <p className="text-sm font-bold">{clientName}</p>
              <p className="text-xs text-muted-foreground">{clientEmail}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
