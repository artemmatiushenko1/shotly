'use client';

import { PackageIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Category } from '@/entities/models/category';

import { Button } from '@shotly/ui/components/button';

import EmptyState from '../../_components/empty-state';
import CreateServiceDialog from './use-cases/create-service/creare-service-dialog';

type EmptyProps = {
  categories: Category[];
};

function Empty({ categories }: EmptyProps) {
  const t = useTranslations('services.empty');

  return (
    <EmptyState
      title={t('title')}
      description={t('description')}
      icon={PackageIcon}
      action={
        <CreateServiceDialog categories={categories}>
          <Button>
            <PlusIcon />
            {t('createButton')}
          </Button>
        </CreateServiceDialog>
      }
    />
  );
}

export default Empty;
