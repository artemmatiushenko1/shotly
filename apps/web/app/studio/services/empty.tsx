import { PackageIcon, PlusIcon } from 'lucide-react';
import React from 'react';

import { Category } from '@/entities/models/category';

import { Button } from '@shotly/ui/components/button';

import CreateServiceDialog from './use-cases/manage-service/service-dialog';

type EmptyProps = {
  categories: Category[];
};

function Empty({ categories }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
        <PackageIcon className="size-20 stroke-1" />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Start selling your photography
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          Services are the specific packages clients will see on your public
          profile. Create clear offerings like &apos;1-Hour Portrait&apos; or
          &apos;Full Day Wedding&apos; to help clients book you faster.
        </p>
      </div>
      <CreateServiceDialog categories={categories}>
        <Button>
          <PlusIcon />
          Create Service
        </Button>
      </CreateServiceDialog>
    </div>
  );
}

export default Empty;
