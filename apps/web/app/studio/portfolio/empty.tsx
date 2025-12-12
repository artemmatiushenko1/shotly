import { BookImageIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Category } from '@/entities/models/category';

import { Button } from '@shotly/ui/components/button';

import EmptyState from '../../_components/empty-state';
import { CreateCollectionDialog } from './use-cases/create-collection/create-collection-dialog';

type EmptyProps = {
  categories: Category[];
};

function Empty({ categories }: EmptyProps) {
  const t = useTranslations('portfolio.empty');

  return (
    <EmptyState
      title={t('title')}
      description={t('description.line1') + ' ' + t('description.line2')}
      icon={BookImageIcon}
      action={
        <CreateCollectionDialog categories={categories}>
          <Button>
            <PlusIcon />
            {t('createCollection')}
          </Button>
        </CreateCollectionDialog>
      }
    />
  );
}

export default Empty;
