import { useState, useMemo } from 'react';
import { Service } from '@/domain/service';
import { VisibilityStatus } from '@/domain/common';

export type ServiceFilterTab = 'All' | 'Public' | 'Private' | 'Archived';

export const SERVICE_FILTER_TABS: ServiceFilterTab[] = [
  'All',
  'Public',
  'Private',
  'Archived',
];

const takeServicesByStatus = (
  services: Service[],
  status: VisibilityStatus,
) => {
  return services.filter((service) => service.visibilityStatus === status);
};

const excludeArchivedServices = (services: Service[]) => {
  return services.filter((service) => !service.archivedAt);
};

const takeArchivedServices = (services: Service[]) => {
  return services.filter((service) => service.archivedAt);
};

export function useServiceFilter(services: Service[]) {
  const [selectedTab, setSelectedTab] = useState<ServiceFilterTab>('All');

  const counts = useMemo(
    () => ({
      All: excludeArchivedServices(services).length,
      Public: excludeArchivedServices(
        takeServicesByStatus(services, VisibilityStatus.PUBLIC),
      ).length,
      Private: excludeArchivedServices(
        takeServicesByStatus(services, VisibilityStatus.PRIVATE),
      ).length,
      Archived: takeArchivedServices(services).length,
    }),
    [services],
  );

  const filteredServices = useMemo(() => {
    if (selectedTab === 'All') {
      return excludeArchivedServices(services);
    }

    if (selectedTab === 'Archived') {
      return takeArchivedServices(services);
    }

    if (selectedTab === 'Public') {
      return excludeArchivedServices(
        takeServicesByStatus(services, VisibilityStatus.PUBLIC),
      );
    }

    if (selectedTab === 'Private') {
      return excludeArchivedServices(
        takeServicesByStatus(services, VisibilityStatus.PRIVATE),
      );
    }

    return services;
  }, [services, selectedTab]);

  return {
    selectedTab,
    setSelectedTab,
    counts,
    filteredServices,
    tabs: SERVICE_FILTER_TABS,
  };
}
