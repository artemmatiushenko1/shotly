'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import OrderCard from '@/_components/booking-card';
import { Order } from '@/entities/models/order';

import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';

import BookingActions from './booking-actions';
import PhotorgapherInfo from './photographer-info';

type BookingTabsProps = {
  orders: Order[];
};

function BookingTabs(props: BookingTabsProps) {
  const { orders } = props;

  const t = useTranslations('myBookings');

  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="mb-4">
        <TabsTrigger value="upcoming">{t('tabs.upcoming')}</TabsTrigger>
        <TabsTrigger value="past">{t('tabs.past')}</TabsTrigger>
        <TabsTrigger value="cancelled">{t('tabs.cancelled')}</TabsTrigger>
      </TabsList>
      <div className="min-h-[300px]">
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              userInfo={
                <PhotorgapherInfo
                  id={order.photographer.id}
                  name={order.photographer.name}
                  profileImageUrl={order.photographer.profileImageUrl}
                />
              }
              actions={
                <BookingActions
                  status={order.status}
                  onCancel={() => {}}
                  onLeaveReview={() => {}}
                  onMessage={() => {}}
                />
              }
            />
          ))}
        </div>
      </div>
    </Tabs>
  );
}

export default BookingTabs;
