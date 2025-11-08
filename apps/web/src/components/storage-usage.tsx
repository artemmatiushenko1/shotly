'use client';

import { useTranslations } from 'next-intl';

const StorageUsage = () => {
  const t = useTranslations('sidebar.storage');

  // TODO: Replace with actual storage values from API/database
  const usedGB = 7.2;
  const totalGB = 10;
  const percentage = (usedGB / totalGB) * 100;

  return (
    <div className="p-3">
      <div className="text-sm text-gray-600 mb-2">{t('label')}</div>
      <div className="bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-primary h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500">
        {t('usage', { used: usedGB, total: totalGB })}
      </div>
    </div>
  );
};

export { StorageUsage };
