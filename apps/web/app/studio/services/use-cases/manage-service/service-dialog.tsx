'use client';

import { HandshakeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

import { Category } from '@/domain/category';
import { Service } from '@/domain/service';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';

import CreateServiceForm from './service-form';
import {
  createServiceAction,
  updateServiceAction,
} from './service-form.actions';

type CreateServiceDialogProps = {
  categories: Category[];
  children: React.ReactNode;
  service?: Service;
};

function CreateServiceDialog(props: CreateServiceDialogProps) {
  const { children: trigger, categories, service } = props;

  const t = useTranslations('services.createServiceDialog');

  const [open, setOpen] = useState(false);

  const handleSuccess = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const isEditMode = !!service;

  const formAction =
    isEditMode && service
      ? updateServiceAction.bind(null, service.id)
      : createServiceAction;

  const submitLabel = isEditMode
    ? t('form.actions.saveChanges')
    : t('form.actions.create');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[650px] h-[600px] overflow-y-scroll flex flex-col">
        <DialogHeader className="flex-row space-x-2 mb-2">
          <div className="size-8 p-2 bg-primary/15 rounded-md ">
            <HandshakeIcon className="text-primary size-4" />
          </div>
          <div>
            <DialogTitle className="mb-1">{t('dialog.title')}</DialogTitle>
            <DialogDescription>{t('dialog.description')}</DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex-1">
          <CreateServiceForm
            action={formAction}
            submitLabel={submitLabel}
            defaultValues={service}
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
