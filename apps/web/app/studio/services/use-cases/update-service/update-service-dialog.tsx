'use client';

import { HandshakeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

import { Category } from '@/entities/models/category';
import { Service } from '@/entities/models/service';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';

import ServiceForm from '../../_ui/service-form/service-form';
import { updateServiceAction } from './updade-service-form.actions';

type UpdateServiceDialogProps = {
  categories: Category[];
  children: React.ReactNode;
  service: Service;
};

function UpdateServiceDialog(props: UpdateServiceDialogProps) {
  const { children: trigger, categories, service } = props;

  const t = useTranslations('services.updateServiceDialog');

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
          <ServiceForm
            action={updateServiceAction.bind(null, service.id)}
            submitLabel={t('submitLabel')}
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

export default UpdateServiceDialog;
