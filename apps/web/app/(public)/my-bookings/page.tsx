'use client';

import { useTranslations } from 'next-intl';
import { unstable_ViewTransition as ViewTransition } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shotly/ui/components/tabs';

import OrderCard from '../../_components/booking-card';
import BookingActions from './booking-actions';
import PhotorgapherInfo from './photographer-info';

function MyBookings() {
  const t = useTranslations('myBookings');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-sm text-muted-foreground mb-4">{t('description')}</p>
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">{t('tabs.upcoming')}</TabsTrigger>
          <TabsTrigger value="past">{t('tabs.past')}</TabsTrigger>
          <TabsTrigger value="cancelled">{t('tabs.cancelled')}</TabsTrigger>
        </TabsList>
        <div className="min-h-[300px]">
          <ViewTransition>
            <TabsContent value="upcoming" className="flex flex-col gap-4">
              <OrderCard
                status="pending"
                userInfo={<PhotorgapherInfo />}
                actions={
                  <BookingActions
                    status="pending"
                    onCancel={() => {}}
                    onLeaveReview={() => {}}
                    onMessage={() => {}}
                  />
                }
              />
              <OrderCard
                status="confirmed"
                userInfo={<PhotorgapherInfo />}
                actions={
                  <BookingActions
                    status="confirmed"
                    onCancel={() => {}}
                    onLeaveReview={() => {}}
                    onMessage={() => {}}
                  />
                }
              />
            </TabsContent>
            <TabsContent value="past">
              <OrderCard
                status="completed"
                userInfo={<PhotorgapherInfo />}
                actions={
                  <BookingActions
                    status="completed"
                    onCancel={() => {}}
                    onLeaveReview={() => {}}
                    onMessage={() => {}}
                  />
                }
              />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrderCard
                status="cancelled"
                userInfo={<PhotorgapherInfo />}
                actions={
                  <BookingActions
                    status="cancelled"
                    onCancel={() => {}}
                    onLeaveReview={() => {}}
                    onMessage={() => {}}
                  />
                }
              />
            </TabsContent>
          </ViewTransition>
        </div>
      </Tabs>
    </div>
  );
}

export default MyBookings;
