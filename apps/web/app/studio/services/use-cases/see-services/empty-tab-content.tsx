import { SearchXIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import EmptyState from '../../../../_components/empty-state';
import { ServiceFilterTab } from './use-service-filter.hook';

type EmptyTabContentProps = {
  tab: ServiceFilterTab;
  className?: string;
};

function EmptyTabContent({ tab, className }: EmptyTabContentProps) {
  const t = useTranslations('services.emptyTabContent');

  const getTitle = () => {
    return t(`titles.${tab}`);
  };

  const getDescription = () => {
    return t(`descriptions.${tab}`);
  };

  return (
    <EmptyState
      className={className}
      title={getTitle()}
      description={getDescription()}
      icon={SearchXIcon}
    />
  );
}

export default EmptyTabContent;
