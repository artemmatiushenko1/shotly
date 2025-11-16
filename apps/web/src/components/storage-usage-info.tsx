'use client';

import { StorageUsage } from '@/domain/user';
import { useTranslations } from 'next-intl';

type StorageUsageInfoProps = {
  storageUsage: StorageUsage;
};

const StorageUsageInfo = (props: StorageUsageInfoProps) => {
  const storageUsage = props?.storageUsage;

  const t = useTranslations('sidebar.storage');

  const usedGB = storageUsage?.storageUsage / 1024 / 1024 / 1024;
  const totalGB = storageUsage?.storageLimit / 1024 / 1024 / 1024;
  const percentage = (usedGB / totalGB) * 100;

  return (
    <div className="p-3">
      <div className="text-sm text-muted-foreground mb-2">{t('label')}</div>
      <div className="bg-muted-foreground/10 rounded-full h-2 mb-2">
        <div
          className="bg-primary h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-muted-foreground">
        {t('usage', { used: usedGB, total: totalGB })}
      </div>
    </div>
  );
};

export { StorageUsageInfo };
