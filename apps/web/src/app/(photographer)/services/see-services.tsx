'use client';

import { Badge } from '@shotly/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import ServiceCard from './service-card';
import { Service } from '@/domain/service';
import { Category } from '@/domain/category';
import { useServiceFilter, ServiceFilterTab } from '@/hooks/use-service-filter';

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

  const { selectedTab, setSelectedTab, counts, filteredServices, tabs } =
    useServiceFilter(services);

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        defaultValue="All"
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as ServiceFilterTab)}
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
      {filteredServices.map((service) => (
        <ServiceCard
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
        />
      ))}
    </div>
  );
}

export default SeeServices;
