import { useState, useMemo } from 'react';
import { Service, ServiceStatus } from '@/domain/service';

export type ServiceFilterTab = 'All' | 'Public' | 'Private' | 'Archived';

export const SERVICE_FILTER_TABS: ServiceFilterTab[] = [
  'All',
  'Public',
  'Private',
  'Archived',
];

const takeServicesByStatus = (services: Service[], status: ServiceStatus) => {
  return services.filter((service) => service.status === status);
};

const excludeArchivedServices = (services: Service[]) => {
  return services.filter(
    (service) => service.status !== ServiceStatus.ARCHIVED,
  );
};

// TODO: move hook to services folder

export function useServiceFilter(services: Service[]) {
  const [selectedTab, setSelectedTab] = useState<ServiceFilterTab>('All');

  const counts = useMemo(
    () => ({
      All: excludeArchivedServices(services).length,
      Public: takeServicesByStatus(services, ServiceStatus.PUBLIC).length,
      Private: takeServicesByStatus(services, ServiceStatus.PRIVATE).length,
      Archived: takeServicesByStatus(services, ServiceStatus.ARCHIVED).length,
    }),
    [services],
  );

  const filteredServices = useMemo(() => {
    if (selectedTab === 'All') {
      return excludeArchivedServices(services);
    }

    const statusMap: Record<ServiceFilterTab, ServiceStatus | null> = {
      All: null,
      Public: ServiceStatus.PUBLIC,
      Private: ServiceStatus.PRIVATE,
      Archived: ServiceStatus.ARCHIVED,
    };

    const status = statusMap[selectedTab];
    if (!status) {
      return services;
    }

    return takeServicesByStatus(services, status);
  }, [services, selectedTab]);

  return {
    selectedTab,
    setSelectedTab,
    counts,
    filteredServices,
    tabs: SERVICE_FILTER_TABS,
  };
}
