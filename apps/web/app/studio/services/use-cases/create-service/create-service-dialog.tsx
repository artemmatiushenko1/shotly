'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { HandshakeIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import CreateServiceForm from './create-service-form';
import { Category } from '@/domain/category';
import { useTranslations } from 'next-intl';

type CreateServiceDialogProps = {
  categories: Category[];
  children: React.ReactNode;
};

function CreateServiceDialog(props: CreateServiceDialogProps) {
  const { children: trigger, categories } = props;
  const t = useTranslations('services.createServiceDialog.dialog');

  const [open, setOpen] = useState(false);

  const handleSuccess = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[650px] h-[600px] overflow-y-scroll flex flex-col">
        <DialogHeader className="flex-row space-x-2 mb-2">
          <div className="size-8 p-2 bg-primary/15 rounded-md ">
            <HandshakeIcon className="text-primary size-4" />
          </div>
          <div>
            <DialogTitle className="mb-1">{t('title')}</DialogTitle>
            <DialogDescription>{t('description')}</DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex-1">
          <CreateServiceForm
            categories={categories}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateServiceDialog;
