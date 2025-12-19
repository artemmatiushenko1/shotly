'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import OrderCard from '@/_components/booking-card';
import { Order, OrderStatus } from '@/entities/models/order';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';

import BookingActions from './booking-actions';
import PhotorgapherInfo from './photographer-info';

enum BookingTab {
  UPCOMING = 'upcoming',
  PAST = 'past',
  CANCELLED = 'cancelled',
}

type BookingTabsProps = {
  orders: Order[];
};

function BookingTabs(props: BookingTabsProps) {
  const { orders } = props;

  const t = useTranslations('myBookings');

  const [selectedTab, setSelectedTab] = useState<BookingTab>(
    BookingTab.UPCOMING,
  );

  const bookingTabs = [
    BookingTab.UPCOMING,
    BookingTab.PAST,
    BookingTab.CANCELLED,
  ];

  const ordersByTab = {
    [BookingTab.UPCOMING]: orders.filter(
      (order) =>
        order.status === OrderStatus.PENDING ||
        order.status === OrderStatus.CONFIRMED,
    ),
    [BookingTab.PAST]: orders.filter(
      (order) => order.status === OrderStatus.COMPLETED,
    ),
    [BookingTab.CANCELLED]: orders.filter(
      (order) => order.status === OrderStatus.CANCELLED,
    ),
  };

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => setSelectedTab(value as BookingTab)}
    >
      <TabsList className="mb-4">
        {bookingTabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {t(`tabs.${tab}`)}
            <Badge
              variant={tab === selectedTab ? 'default' : 'secondary'}
              className="h-5 min-w-5 rounded-full px-1 ml-1"
            >
              {ordersByTab[tab].length}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="min-h-[300px]">
        <div className="flex flex-col gap-4">
          {ordersByTab[selectedTab].map((order) => (
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
                  photographerEmail={order.photographer.email}
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
