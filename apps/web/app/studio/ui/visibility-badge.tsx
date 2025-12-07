'use client';

import { GlobeIcon, LockIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@shotly/ui/components/badge';
import { cn } from '@shotly/ui/lib/utils';

type VisibilityBadgeProps = {
  isPublic: boolean;
  className?: string;
};

const VisibilityBadge = ({ isPublic, className }: VisibilityBadgeProps) => {
  const t = useTranslations('common.visibility');

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs bg-white text-gray-700 rounded-full px-3 py-1 border',
        className,
      )}
    >
      <span
        className={cn(
          'size-1 rounded-full',
          isPublic ? 'bg-green-400' : 'bg-destructive',
        )}
      >
        &nbsp;
      </span>
      {isPublic ? (
        <>
          <GlobeIcon /> {t('public')}
        </>
      ) : (
        <>
          <LockIcon /> {t('private')}
        </>
      )}
    </Badge>
  );
};

export { VisibilityBadge };
