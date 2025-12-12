'use client';

import { UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@shotly/ui/components/button';

import EmptyState from '../../../_components/empty-state';
import UploadPhotosDialog from './use-cases/upload-photos/upload-photos-dialog';

type EmptyProps = {
  collectionId: string;
  photographerId: string;
  className?: string;
};

const Empty = ({ collectionId, photographerId, className }: EmptyProps) => {
  const t = useTranslations('portfolio.collectionDetails.empty');

  return (
    <EmptyState
      title={t('title')}
      description={t('description')}
      icon={UploadIcon}
      className={className}
      action={
        <UploadPhotosDialog
          collectionId={collectionId}
          photographerId={photographerId}
        >
          <Button size="lg">{t('uploadButton')}</Button>
        </UploadPhotosDialog>
      }
    />
  );
};

export { Empty };
