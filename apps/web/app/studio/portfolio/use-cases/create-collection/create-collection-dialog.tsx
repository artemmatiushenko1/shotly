'use client';

import { Folder } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Category } from '@/entities/models/category';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';

import CollectionForm from '../../_ui/collection-form/collection-form';
import { createCollectionAction } from './create-collection-form.actions';

type CreateCollectionDialogProps = {
  categories: Category[];
  children: React.ReactNode;
};

const CreateCollectionDialog = (props: CreateCollectionDialogProps) => {
  const { children: trigger, categories } = props;

  const t = useTranslations('portfolio.createCollectionDialog');

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="flex-row space-x-2 mb-2">
          <div className="size-8 p-2 bg-primary/15 rounded-md ">
            <Folder className="text-primary size-4" />
          </div>
          <div>
            <DialogTitle className="mb-1">{t('dialog.title')}</DialogTitle>
            <DialogDescription>{t('dialog.description')}</DialogDescription>
          </div>
        </DialogHeader>
        <CollectionForm
          categories={categories}
          submitLabel={t('form.actions.continue')}
          action={createCollectionAction}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export { CreateCollectionDialog };
