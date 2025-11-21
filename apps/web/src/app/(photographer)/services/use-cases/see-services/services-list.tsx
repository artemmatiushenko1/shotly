'use client';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import ServiceCard from './service-card';
import { Service } from '@/domain/service';
import { Category } from '@/domain/category';
import {
  useServiceFilter,
  ServiceFilterTab,
} from '@/app/(photographer)/services/use-cases/see-services/use-service-filter';
import { useTranslations } from 'next-intl';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { startTransition } from 'react';
import ServiceCardActions from './service-card-actions';

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
          <ViewTransition key={service.id} name={service.id}>
            <ServiceCard
              isPublicView
              key={service.id}
              id={service.id}
              coverUrl={service.coverImageUrl}
              name={service.name}
              description={service.description}
              price={service.price.toString()}
              priceUnit={service.currency}
              deliveryTime={service.deliveryTimeInDays.toString()}
              features={service.features}
              status={service.status}
              categoryName={categoryMap[service.categoryId] ?? '-'}
              extraActions={
                <ServiceCardActions
                  serviceId={service.id}
                  serviceName={service.name}
                  status={service.status}
                  onEdit={() => {}}
                />
              }
            />
          </ViewTransition>
        ))}
      </div>
    </div>
  );
}

export default ServicesList;
