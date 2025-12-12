import React from 'react';

import { cn } from '@shotly/ui/lib/utils';

type EmptyStateProps = {
  title: string;
  description: string;
  icon: React.FC<React.ComponentProps<'svg'>>;
  action?: React.ReactNode;
  className?: string;
};

function EmptyState({
  className,
  title,
  description,
  icon: Icon,
  action,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
        <Icon className="size-20 stroke-1" />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground max-w-lg">{description}</p>
      </div>
      {action}
    </div>
  );
}

export default EmptyState;
