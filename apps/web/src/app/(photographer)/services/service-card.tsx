import { Card, CardDescription } from '@shotly/ui/components/card';
import Image from 'next/image';
import React from 'react';
import { VisibilityBadge } from '../portfolio/visibility-badge';
import { ClockIcon, EditIcon, PackageIcon, TrashIcon } from 'lucide-react';
import { Button } from '@shotly/ui/components/button';

type ServiceCardProps = {
  coverUrl: string;
  name: string;
  description: string;
  price: string;
  priceUnit: string;
  categoryName: string;
  deliveryTime: string;
  features: string[];
  isPublic: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
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
    isPublic,
    onEdit,
    onDelete,
  } = props;

  console.log(features);

  // TODO: refactor this to use a more elegant solution
  const featuresLabel =
    features.length === 0
      ? '—'
      : features.length === 1
        ? features[0]
        : `${features[0]}, +${features.length - 1} more`;

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
            <p className="text-muted-foreground text-xs mb-1">Price</p>
            <p className="text-lg font-bold">
              {priceUnit} {price}
              <span className="text-muted-foreground text-sm font-normal">
                /hour
              </span>
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">Category</p>
            <p className="font-medium text-sm">{categoryName}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">Delivery time</p>
            <p className="inline-flex gap-1 items-center font-medium text-sm">
              <ClockIcon className="w-4 text-muted-foreground" />
              {deliveryTime} days
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">Features</p>
            <p className="inline-flex gap-1 items-center font-medium text-sm w-56">
              <PackageIcon className="text-muted-foreground w-4" />{' '}
              {featuresLabel}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">Status</p>
            <VisibilityBadge isPublic={isPublic} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Button variant="outline" onClick={onEdit}>
          <EditIcon /> Edit
        </Button>
        <Button variant="ghost" onClick={onDelete}>
          <TrashIcon /> Delete
        </Button>
      </div>
    </Card>
  );
}

export default ServiceCard;
