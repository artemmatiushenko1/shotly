'use client';

import { ClockIcon, PackageIcon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { VisibilityStatus } from '@/entities/models/common';
import { Service } from '@/entities/models/service';

import { Card, CardDescription } from '@shotly/ui/components/card';

import { VisibilityBadge } from '../../../../_components/visibility-badge';

type ServiceCardProps = {
  service: Service;
  categoryName: string;
  isPublicView?: boolean;
  extraActions?: React.ReactNode;
};

const getFeaturesLabel = (
  features: string[],
  t: ReturnType<typeof useTranslations>,
) => {
  if (features.length === 0) return '—';
  if (features.length === 1) return features[0];

  return t('features.more', {
    first: features[0] ?? '',
    count: features.length - 1,
  });
};

function ServiceCard(props: ServiceCardProps) {
  const { service, isPublicView = false, extraActions, categoryName } = props;

  const t = useTranslations('services.serviceCard');

  const featuresLabel = getFeaturesLabel(service.features, t);

  return (
    <Card className="shadow-none py-0 overflow-hidden flex-row bg-muted/20 hover:bg-accent/50 gap-4">
      <div className="relative p-2 overflow-hidden">
        <Image
          alt={service.name}
          src={service.coverImageUrl}
          width={200}
          height={160}
          className="size-40 w-50 object-cover rounded-lg border"
        />
      </div>
      <div className="py-3 flex flex-col justify-between flex-1 w-0">
        <div>
          <h2 className="font-bold text-lg">{service.name}</h2>
          <CardDescription className="mb-2 max-w-lg">
            {service.description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-start gap-10">
          <div className="flex flex-col w-1/3">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.price')}
            </p>
            <p className="text-lg font-bold">
              {service.price} {service.currency}
              <span className="text-muted-foreground text-sm font-normal">
                {t('fields.priceUnit')}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-start w-1/5">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.category')}
            </p>
            <p className="font-medium text-sm">{categoryName}</p>
          </div>
          <div className="flex flex-col items-start w-1/5">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.deliveryTime')}
            </p>
            <p className="inline-flex gap-1 items-center font-medium text-sm flex-1/4">
              <ClockIcon className="w-4 text-muted-foreground" />
              {t('fields.deliveryTimeValue', {
                days: service.deliveryTimeInDays,
              })}
            </p>
          </div>
          <div className="flex flex-col items-start w-1/5">
            <p className="text-muted-foreground text-xs mb-1">
              {t('fields.features')}
            </p>
            <p className="inline-flex gap-1 items-center font-medium text-sm text-nowrap">
              <PackageIcon className="text-muted-foreground w-4" />{' '}
              {featuresLabel}
            </p>
          </div>
          {!isPublicView && (
            <div className="flex flex-col items-start w-1/5">
              <p className="text-muted-foreground text-xs mb-1">
                {t('fields.status')}
              </p>
              <VisibilityBadge
                isPublic={service.visibilityStatus === VisibilityStatus.PUBLIC}
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-1/8 flex justify-end">{extraActions}</div>
    </Card>
  );
}

export default ServiceCard;
