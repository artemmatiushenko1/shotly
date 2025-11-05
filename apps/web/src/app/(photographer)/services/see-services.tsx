'use client';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import React, { useState } from 'react';
import ServiceCard from './service-card';
import { Service, ServiceStatus } from '@/domain/service';
import { Category } from '@/domain/category';

type SeeServicesProps = {
  categories: Category[];
  services: Service[];
};

function SeeServices(props: SeeServicesProps) {
  const { categories, services } = props;

  const categoryMap = categories.reduce(
    (acc, category) => {
      acc[category.id] = category.name;
      return acc;
    },
    {} as Record<string, string>,
  );

  // TODo: create a custom hook for this
  const [selectedTab, setSelectedTab] = useState('All');

  const tabs = ['All', 'Public', 'Private', 'Archived'];

  const counts = {
    'All': services.length,
    'Public': services.filter((s) => s.status === ServiceStatus.PUBLIC).length,
    'Private': services.filter((s) => s.status === ServiceStatus.PRIVATE)
      .length,
    'Archived': services.filter((s) => s.status === ServiceStatus.ARCHIVED)
      .length,
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
        <ServiceCard
          key={service.name}
          coverUrl={service.coverImageUrl}
          name={service.name}
          description={service.description}
          price={service.price.toString()}
          priceUnit={service.currency}
          deliveryTime={service.deliveryTimeInDays.toString()}
          features={service.features}
          isPublic={service.status === ServiceStatus.PUBLIC}
          categoryName={categoryMap[service.categoryId] ?? '-'}
        />
      ))}
    </div>
  );
}

export default SeeServices;
