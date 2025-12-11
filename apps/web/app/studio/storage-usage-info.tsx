'use client';

import { useTranslations } from 'next-intl';

import { StorageUsage } from '@/domain/user';
import { convertBytesToGb, convertBytesToMb } from '@/utils/files/utils';

type StorageUsageInfoProps = {
  storageUsage: StorageUsage;
};

const StorageUsageInfo = (props: StorageUsageInfoProps) => {
  const storageUsage = props?.storageUsage;

  const t = useTranslations('sidebar.storage');

  const showUsageInGbThresholdGb = 1;

  const usedGB = convertBytesToGb(storageUsage?.storageUsage);
  const usedMB = convertBytesToMb(storageUsage?.storageUsage);
  const totalGB = convertBytesToGb(storageUsage?.storageLimit);

  const percentage = (usedGB / totalGB) * 100;

  return (
    <div className="p-3">
      <div className="text-sm text-muted-foreground mb-2">{t('label')}</div>
      <div className="bg-muted-foreground/10 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className="bg-primary h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground">
        {usedGB > showUsageInGbThresholdGb
          ? t('usageGb', {
              usedGb: Math.round(usedGB),
              totalGb: Math.round(totalGB),
            })
          : t('usageMb', {
              usedMb: Math.round(usedMB),
              totalGb: Math.round(totalGB),
            })}
      </div>
    </div>
  );
};

export { StorageUsageInfo };
