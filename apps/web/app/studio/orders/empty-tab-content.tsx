import { StoreIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import EmptyState from '../../_components/empty-state';
import { OrdersTab } from './orders-view';

type EmptyTabContentProps = {
  tab: OrdersTab;
  className?: string;
};

function EmptyTabContent({ tab, className }: EmptyTabContentProps) {
  const t = useTranslations('orders.emptyTabContent');

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
      icon={StoreIcon}
    />
  );
}

export default EmptyTabContent;
