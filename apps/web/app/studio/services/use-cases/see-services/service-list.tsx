'use client';

import { useTranslations } from 'next-intl';
import { startTransition } from 'react';

import { Category } from '@/domain/category';
import { Service } from '@/domain/service';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';

import ServiceCard from './service-card';
import ServiceCardButtons from './service-card-buttons';
import { ServiceFilterTab, useServiceFilter } from './use-service-filter.hook';

type ServicesListProps = {
  categories: Category[];
  services: Service[];
};

function ServicesList(props: ServicesListProps) {
  const { categories, services } = props;

  const t = useTranslations('services.filters');

  const categoryMap = categories.reduce(
    (acc, category) => {
      acc[category.id] = category.name;
      return acc;
    },
    {} as Record<string, string>,
  );

  const { selectedTab, setSelectedTab, counts, filteredServices, tabs } =
    useServiceFilter(services);

  return (
    <div className="flex flex-col">
      <Tabs
        defaultValue="All"
        value={selectedTab}
        onValueChange={(value) =>
          startTransition(() => setSelectedTab(value as ServiceFilterTab))
        }
      >
        <TabsList className="my-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {t(tab)}{' '}
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
      <div className="flex flex-col gap-4">
        {filteredServices.map((service) => (
          // TODO: add view transition back, currently when edit service, it displays a card over the modal for a sec
          // <ViewTransition key={service.id}>
          <ServiceCard
            key={service.id}
            service={service}
            isPublicView={false}
            categoryName={categoryMap[service.categoryId] ?? '-'}
            extraActions={
              <ServiceCardButtons service={service} categories={categories} />
            }
          />
          // </ViewTransition>
        ))}
      </div>
    </div>
  );
}

export default ServicesList;
