import { useTranslations } from 'next-intl';

export const formatBytes = (
  bytes: number,
  t: ReturnType<typeof useTranslations>,
) => {
  if (bytes === 0) return `0 ${t('utils.fileSize.bytes')}`;

  const k = 1024;
  const sizes = [
    t('utils.fileSize.bytes'),
    t('utils.fileSize.kb'),
    t('utils.fileSize.mb'),
    t('utils.fileSize.gb'),
  ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};
