import { CalendarIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import EmptyState from '@/_components/empty-state';

import { Button } from '@shotly/ui/components/button';

import { BookingTab } from './booking-tabs';

type EmptyTabContentProps = {
  tab: BookingTab;
  className?: string;
};

function EmptyTabContent({ tab, className }: EmptyTabContentProps) {
  const t = useTranslations('myBookings.emptyTabContent');

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
      icon={CalendarIcon}
      action={
        tab === BookingTab.UPCOMING ? (
          <Button asChild>
            <Link href="/search">
              <SearchIcon />
              {t('searchPhotographers')}
            </Link>
          </Button>
        ) : null
      }
    />
  );
}

export default EmptyTabContent;
