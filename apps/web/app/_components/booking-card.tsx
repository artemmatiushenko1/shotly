'use client';

import { CopyIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Order, OrderStatus } from '@/entities/models/order';

import { Badge } from '@shotly/ui/components/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@shotly/ui/components/card';
import { DateFormat, formatDate } from '@shotly/ui/lib/date';

const BookingStatusBadge = ({ status }: { status: OrderStatus }) => {
  const t = useTranslations('orders.status');

  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-lime-600/10 px-3 py-1 rounded-full text-lime-600">
          {t('completed')}
        </Badge>
      );
    case 'confirmed':
      return (
        <Badge className="bg-sky-600/10 px-3 py-1 rounded-full text-sky-600">
          {t('confirmed')}
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge className="bg-red-600/10 px-3 py-1 rounded-full text-red-600">
          {t('cancelled')}
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-500">
          {t('pending')}
        </Badge>
      );
  }
};

type OrderCardProps = {
  order: Order;
  actions: React.ReactNode;
  userInfo: React.ReactNode;
};

function OrderCard({ order, actions, userInfo }: OrderCardProps) {
  const t = useTranslations('orders.card');
  const locale = useLocale();

  return (
    <Card className="shadow-none pb-0 overflow-hidden">
      <CardHeader className="flex justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            {t('bookingDate')}
          </p>
          <p className="text-xl font-bold">
            {formatDate(order.bookingDate, locale, DateFormat.DAY_MONTH_YEAR)}
          </p>
        </div>
        {userInfo}
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('bookingId')}</p>
          <p className="text-md font-bold inline-flex items-center gap-2">
            {order.displayId}{' '}
            <CopyIcon className="size-4 cursor-pointer text-muted-foreground" />
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('status')}</p>
          <BookingStatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="shadow-none flex flex-row items-center gap-4 mb-4">
          <div className="size-[60px] overflow-hidden rounded-sm shrink-0">
            <Image
              src={order.service.coverImageUrl}
              alt={t('serviceImageAlt')}
              width={60}
              height={60}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold">{order.service.name}</h3>
            <p className="text-xs text-muted-foreground">
              {order.service.description}
            </p>
          </div>
          <div className="ml-auto mr-2">
            <span className="text-md font-bold">
              {order.service.price} {order.service.currency}
            </span>{' '}
            <span className="text-xs text-muted-foreground text-nowrap">
              {t('priceUnit')}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted pb-5 gap-2">
        <div>
          <p className="text-xs text-muted-foreground">{t('total')}</p>
          <p className="text-md font-bold">
            <span>
              {order.service.price * order.hours} {order.service.currency}
            </span>{' '}
            <span className="text-xs text-muted-foreground text-nowrap font-normal">
              {t('duration', { hours: order.hours })}
            </span>
          </p>
        </div>
        <div className="flex gap-2">{actions}</div>
      </CardFooter>
    </Card>
  );
}

export default OrderCard;
