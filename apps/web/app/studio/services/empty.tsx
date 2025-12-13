import { PackageIcon, PlusIcon } from 'lucide-react';
import React from 'react';

import { Category } from '@/entities/models/category';

import { Button } from '@shotly/ui/components/button';

import EmptyState from '../../_components/empty-state';
import CreateServiceDialog from './use-cases/create-service/creare-service-dialog';

type EmptyProps = {
  categories: Category[];
};

function Empty({ categories }: EmptyProps) {
  return (
    <EmptyState
      title="Start selling your photography"
      description="Services are the specific packages clients will see on your public profile. Create clear offerings like '1-Hour Portrait' or 'Full Day Wedding' to help clients book you faster."
      icon={PackageIcon}
      action={
        <CreateServiceDialog categories={categories}>
          <Button>
            <PlusIcon />
            Create Service
          </Button>
        </CreateServiceDialog>
      }
    />
  );
}

export default Empty;
