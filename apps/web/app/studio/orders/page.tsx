'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';

import OrderCard from '../../_components/booking-card';
import MainHeader from '../../_components/main-header';
import ClientInfo from './client-info';
import OrderActions from './order-actions';

function Orders() {
  const t = useTranslations('orders');
  const [selectedTab, setSelectedTab] = useState<
    'pending' | 'confirmed' | 'completed'
  >('pending');

  return (
    <>
      <MainHeader title={t('title')} caption={t('caption')} />
      <Tabs
        value={selectedTab}
        onValueChange={(value) =>
          setSelectedTab(value as 'pending' | 'confirmed' | 'completed')
        }
      >
        <TabsList className="px-4 mt-4">
          <TabsTrigger value="pending">
            {t('tabs.requests')}{' '}
            <Badge
              variant={selectedTab === 'pending' ? 'default' : 'secondary'}
              className="h-5 min-w-5 rounded-full px-1 ml-1"
            >
              1
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="confirmed">{t('tabs.upcoming')}</TabsTrigger>
          <TabsTrigger value="completed">{t('tabs.history')}</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="p-4 space-y-4">
        <OrderCard
          status="pending"
          userInfo={<ClientInfo orderStatus="pending" />}
          actions={<OrderActions status="pending" />}
        />
        {/* <OrderCard
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
        /> */}
      </div>
    </>
  );
}

export default Orders;
