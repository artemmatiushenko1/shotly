'use client';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import React, { useState } from 'react';
import ServiceCard from './service-card';

type SeeServicesProps = {
  services: {
    coverUrl: string;
    name: string;
    description: string;
    price: string;
    priceUnit: string;
    category: string;
    deliveryTime: string;
    isPublic: boolean;
    features: string[];
  }[];
};

function SeeServices(props: SeeServicesProps) {
  const { services } = props;

  const [selectedTab, setSelectedTab] = useState('All');

  const tabs = ['All', 'Public', 'Private', 'Archived'];
  const counts = {
    'All': services.length,
    'Public': services.filter((s) => s.isPublic).length,
    'Private': services.filter((s) => !s.isPublic).length,
    'Archived': '0',
  };

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        defaultValue="All"
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}{' '}
              <Badge
                variant={tab === selectedTab ? 'default' : 'secondary'}
                className="h-5 min-w-5 rounded-full px-1"
              >
                {counts[tab as keyof typeof counts]}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {services.map((service) => (
        <ServiceCard key={service.name} {...service} />
      ))}
    </div>
  );
}

export default SeeServices;
