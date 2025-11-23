'use client';

import OrderCard from '@/components/booking-card';
import MainHeader from '@/components/main-header';
import OrderActions from './order-actions';
import ClientInfo from './client-info';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import { Badge } from '@shotly/ui/components/badge';
import { useState } from 'react';

function Orders() {
  const [selectedTab, setSelectedTab] = useState<
    'pending' | 'confirmed' | 'completed'
  >('pending');

  return (
    <>
      <MainHeader title="Orders" caption="Manage your orders" />
      <Tabs
        value={selectedTab}
        onValueChange={(value) =>
          setSelectedTab(value as 'pending' | 'confirmed' | 'completed')
        }
      >
        <TabsList className="px-4 mt-4">
          <TabsTrigger value="pending">
            Requests{' '}
            <Badge
              variant={selectedTab === 'pending' ? 'default' : 'secondary'}
              className="h-5 min-w-5 rounded-full px-1 ml-1"
            >
              10
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="confirmed">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">History</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="p-4 space-y-4">
        <OrderCard
          status="pending"
          userInfo={<ClientInfo orderStatus="pending" />}
          actions={<OrderActions status="pending" />}
        />
        <OrderCard
          status="confirmed"
          userInfo={<ClientInfo orderStatus="confirmed" />}
          actions={<OrderActions status="confirmed" />}
        />
        <OrderCard
          status="completed"
          userInfo={<ClientInfo orderStatus="completed" />}
          actions={<OrderActions status="completed" />}
        />
        <OrderCard
          status="cancelled"
          userInfo={<ClientInfo orderStatus="cancelled" />}
          actions={<OrderActions status="cancelled" />}
        />
      </div>
    </>
  );
}

export default Orders;
