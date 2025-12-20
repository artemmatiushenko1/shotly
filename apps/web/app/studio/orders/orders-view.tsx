'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import OrderCard from '@/_components/booking-card';
import { Order, OrderStatus } from '@/entities/models/order';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';

import ClientInfo from './client-info';
import OrderActions from './order-actions';

enum OrdersTab {
  REQUESTS = 'requests',
  UPCOMING = 'upcoming',
  HISTORY = 'history',
}

type OrdersViewProps = {
  orders: Order[];
};

function OrdersView({ orders }: OrdersViewProps) {
  const t = useTranslations('orders');

  const [selectedTab, setSelectedTab] = useState<OrdersTab>(OrdersTab.REQUESTS);

  const ordersByTab = {
    [OrdersTab.REQUESTS]: orders.filter(
      (order) => order.status === OrderStatus.PENDING,
    ),
    [OrdersTab.UPCOMING]: orders.filter(
      (order) => order.status === OrderStatus.CONFIRMED,
    ),
    [OrdersTab.HISTORY]: orders.filter(
      (order) =>
        order.status === OrderStatus.COMPLETED ||
        order.status === OrderStatus.CANCELLED,
    ),
  };

  const ordersCountByTab = {
    [OrdersTab.REQUESTS]: ordersByTab[OrdersTab.REQUESTS].length,
    [OrdersTab.UPCOMING]: ordersByTab[OrdersTab.UPCOMING].length,
    [OrdersTab.HISTORY]: ordersByTab[OrdersTab.HISTORY].length,
  };

  return (
    <>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as OrdersTab)}
      >
        <TabsList className="px-4 mt-4">
          <TabsTrigger value={OrdersTab.REQUESTS}>
            {t('tabs.requests')}{' '}
            <Badge
              className="h-5 min-w-5 rounded-full px-1 ml-1"
              variant={
                selectedTab === OrdersTab.REQUESTS ? 'default' : 'secondary'
              }
            >
              {ordersCountByTab[OrdersTab.REQUESTS]}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value={OrdersTab.UPCOMING}>
            {t('tabs.upcoming')}
          </TabsTrigger>
          <TabsTrigger value={OrdersTab.HISTORY}>
            {t('tabs.history')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="p-4 space-y-4">
        {ordersByTab[selectedTab].map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            userInfo={<ClientInfo orderStatus={order.status} />}
            actions={<OrderActions status={order.status} />}
          />
        ))}
      </div>
    </>
  );
}

export default OrdersView;
