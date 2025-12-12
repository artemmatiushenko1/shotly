import { SearchXIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@shotly/ui/lib/utils';

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
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
        <SearchXIcon className="size-20 stroke-1" />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{getTitle()}</h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          {getDescription()}
        </p>
      </div>
    </div>
  );
}

export default EmptyTabContent;
