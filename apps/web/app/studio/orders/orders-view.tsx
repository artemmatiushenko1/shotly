'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import OrderCard from '@/_components/booking-card';
import { Order, OrderStatus } from '@/entities/models/order';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';

import ClientInfo from './client-info';
import OrderActions from './order-actions';

enum OrdersTab {
  REQUESTS = 'requests',
  UPCOMING = 'upcoming',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

type OrdersViewProps = {
  orders: Order[];
};

function OrdersView({ orders }: OrdersViewProps) {
  const t = useTranslations('orders');

  const ordersByTab = useMemo(
    () => ({
      [OrdersTab.REQUESTS]: orders.filter(
        (order) => order.status === OrderStatus.PENDING,
      ),
      [OrdersTab.UPCOMING]: orders.filter(
        (order) => order.status === OrderStatus.CONFIRMED,
      ),
      [OrdersTab.COMPLETED]: orders.filter(
        (order) => order.status === OrderStatus.COMPLETED,
      ),
      [OrdersTab.CANCELLED]: orders.filter(
        (order) => order.status === OrderStatus.CANCELLED,
      ),
    }),
    [orders],
  );

  const [selectedTab, setSelectedTab] = useState<OrdersTab>(() => {
    if (ordersByTab[OrdersTab.REQUESTS].length > 0) {
      return OrdersTab.REQUESTS;
    }

    return OrdersTab.UPCOMING;
  });

  const ordersCountByTab = useMemo(
    () => ({
      [OrdersTab.REQUESTS]: ordersByTab[OrdersTab.REQUESTS].length,
      [OrdersTab.UPCOMING]: ordersByTab[OrdersTab.UPCOMING].length,
      [OrdersTab.COMPLETED]: ordersByTab[OrdersTab.COMPLETED].length,
      [OrdersTab.CANCELLED]: ordersByTab[OrdersTab.CANCELLED].length,
    }),
    [ordersByTab],
  );

  useEffect(() => {
    if (
      selectedTab === OrdersTab.REQUESTS &&
      ordersCountByTab[OrdersTab.REQUESTS] === 0
    ) {
      setSelectedTab(OrdersTab.UPCOMING);
    }
  }, [ordersCountByTab, selectedTab]);

  const tabs = useMemo(
    () => [
      ...(ordersCountByTab[OrdersTab.REQUESTS] > 0
        ? [
            {
              label: t('tabs.requests'),
              value: OrdersTab.REQUESTS,
              count: ordersCountByTab[OrdersTab.REQUESTS],
            },
          ]
        : []),
      {
        label: t('tabs.upcoming'),
        value: OrdersTab.UPCOMING,
        count: ordersCountByTab[OrdersTab.UPCOMING],
      },
      {
        label: t('tabs.completed'),
        value: OrdersTab.COMPLETED,
        count: ordersCountByTab[OrdersTab.COMPLETED],
      },
      {
        label: t('tabs.cancelled'),
        value: OrdersTab.CANCELLED,
        count: ordersCountByTab[OrdersTab.CANCELLED],
      },
    ],
    [ordersCountByTab, t],
  );

  return (
    <>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as OrdersTab)}
      >
        <TabsList className="px-4 mt-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
              <Badge
                className="h-5 min-w-5 rounded-full px-1 ml-1"
                variant={selectedTab === tab.value ? 'default' : 'secondary'}
              >
                {tab.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="p-4 space-y-4">
        {ordersByTab[selectedTab].map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            userInfo={
              <ClientInfo
                orderStatus={order.status}
                clientName={order.client.name}
                clientEmail={order.client.email}
              />
            }
            actions={
              <OrderActions
                clientEmail={order.client.email}
                orderId={order.id}
                status={order.status}
              />
            }
          />
        ))}
      </div>
    </>
  );
}

export default OrdersView;
