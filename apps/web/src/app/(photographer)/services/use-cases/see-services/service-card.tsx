'use client';

import { Card, CardDescription } from '@shotly/ui/components/card';
import Image from 'next/image';
import React, { startTransition, useActionState } from 'react';
import { VisibilityBadge } from '../../../ui/visibility-badge';
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  ClockIcon,
  EditIcon,
  PackageIcon,
} from 'lucide-react';
import { Button } from '@shotly/ui/components/button';
import { ConfirmationDialog } from '@shotly/ui/components/confirmation-dialog';
import { archiveService } from './actions';
import { ServiceStatus } from '@/domain/service';
import { toast } from '@shotly/ui/components/sonner';
import { useTranslations } from 'next-intl';

type ServiceCardProps = {
  id: string;
  coverUrl: string;
  name: string;
  description: string;
  price: string;
  priceUnit: string;
  categoryName: string;
  deliveryTime: string;
  features: string[];
  // isPublic: boolean;
  status: ServiceStatus;
  onEdit?: () => void;
};

function ServiceCard(props: ServiceCardProps) {
  const {
    id,
    coverUrl,
    name,
    description,
    price,
    priceUnit = '',
    categoryName,
    deliveryTime,
    features,
    status,
    onEdit,
  } = props;
  const t = useTranslations('services.serviceCard');

  // TODO: check if is better to move it to parent, this component will be destroyed on archive
  const [state, archiveServiceAction] = useActionState(archiveService, {
    error: false,
    success: false,
  });

  // TODO: display toast notifications for archive service action
  if (state.error) {
    toast.error(t('errors.archiveFailed'));
  }

  // TODO: refactor this to use a more elegant solution
  const featuresLabel =
    features.length === 0
      ? '—'
      : features.length === 1
        ? features[0]
        : t('features.more', {
            first: features[0] ?? '',
            count: features.length - 1,
          });

  return (
    <Card className="shadow-none py-0 overflow-hidden flex-row bg-muted/20 hover:bg-accent/50 cursor-pointer gap-4">
      <div className="relative p-2 overflow-hidden">
        <Image
          alt={name}
          src={coverUrl}
          width={200}
          height={200}
          className="size-40 w-50 object-cover rounded-lg border"
        />
      </div>
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h2 className="font-bold text-lg">{name}</h2>
          <CardDescription className="mb-2 max-w-lg">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-start gap-10">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.price')}
            </p>
            <p className="text-lg font-bold">
              {priceUnit} {price}
              <span className="text-muted-foreground text-sm font-normal">
                {t('fields.priceUnit')}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.category')}
            </p>
            <p className="font-medium text-sm">{categoryName}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.deliveryTime')}
            </p>
            <p className="inline-flex gap-1 items-center font-medium text-sm">
              <ClockIcon className="w-4 text-muted-foreground" />
              {t('fields.deliveryTimeValue', { days: deliveryTime })}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.features')}
            </p>
            <p className="inline-flex gap-1 items-center font-medium text-sm w-56">
              <PackageIcon className="text-muted-foreground w-4" />{' '}
              {featuresLabel}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.status')}
            </p>
            <VisibilityBadge isPublic={status === ServiceStatus.PUBLIC} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        {status !== ServiceStatus.ARCHIVED && (
          <Button variant="outline" onClick={onEdit}>
            <EditIcon /> {t('actions.edit')}
          </Button>
        )}
        <ConfirmationDialog
          actionSeverity="neutral"
          title={t('archiveDialog.title', { name })}
          description={t('archiveDialog.description')}
          // TODO: display loading state correctly
          onConfirm={() => startTransition(() => archiveServiceAction(id))}
          icon={<ArchiveIcon />}
          confirmLabel={t('archiveDialog.confirmLabel')}
        >
          <div>
            {status !== ServiceStatus.ARCHIVED && (
              <Button variant="ghost">
                <ArchiveIcon /> {t('actions.archive')}
              </Button>
            )}
            {/* TODO: implement restore service action */}
            {status === ServiceStatus.ARCHIVED && (
              <Button variant="ghost">
                <ArchiveRestoreIcon /> {t('actions.restore')}
              </Button>
            )}
          </div>
        </ConfirmationDialog>
      </div>
    </Card>
  );
}

export default ServiceCard;
