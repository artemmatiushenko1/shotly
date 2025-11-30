'use client';

import { Card, CardDescription } from '@shotly/ui/components/card';
import Image from 'next/image';
import { VisibilityBadge } from '../../../ui/visibility-badge';
import { ClockIcon, PackageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { VisibilityStatus } from '@/domain/common';

type ServiceCardProps = {
  id: string;
  coverUrl: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  categoryName: string;
  deliveryTime: string;
  features: string[];
  isPublicView?: boolean;
  visibilityStatus: VisibilityStatus;
  extraActions?: React.ReactNode;
};

function ServiceCard(props: ServiceCardProps) {
  const {
    coverUrl,
    name,
    description,
    price,
    priceUnit = '',
    categoryName,
    deliveryTime,
    features,
    visibilityStatus,
    isPublicView = false,
    extraActions,
  } = props;

  const t = useTranslations('services.serviceCard');

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
          unoptimized
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
              {price} {priceUnit}
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
            <p className="inline-flex gap-1 items-center font-medium text-sm w-58">
              <PackageIcon className="text-muted-foreground w-4" />{' '}
              {featuresLabel}
            </p>
          </div>
          {!isPublicView && (
            <div className="flex flex-col items-start">
              <p className="text-muted-foreground text-xs mb-1">
                {t('fields.status')}
              </p>
              <VisibilityBadge
                isPublic={visibilityStatus === VisibilityStatus.PUBLIC}
              />
            </div>
          )}
        </div>
      </div>
      {extraActions}
    </Card>
  );
}

export default ServiceCard;
