import { Card, CardDescription } from '@shotly/ui/components/card';
import Image from 'next/image';
import React from 'react';
import { VisibilityBadge } from '../portfolio/visibility-badge';
import { ClockIcon, EditIcon, PackageIcon, TrashIcon } from 'lucide-react';
import { Button } from '@shotly/ui/components/button';

function ServiceCard() {
  return (
    <Card className="shadow-none py-0 overflow-hidden flex-row bg-muted/20 hover:bg-accent/50 cursor-pointer">
      <div className="relative p-2 overflow-hidden">
        <Image
          alt=""
          src="/auth-banner-2.jpg"
          width={200}
          height={200}
          className="w-full h-40 object-cover rounded-lg border"
        />
      </div>
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h2 className="font-bold text-lg">Family photoset</h2>
          <CardDescription className="mb-2 max-w-lg">
            Photo on a plain background. From 20 photos. Minimal editing: Basic
            cleaning of photo from 20 photos. Minimal editing: Basic cleaning of
            photo...
          </CardDescription>
        </div>
        <div className="flex items-center justify-start gap-10">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs mb-1">Price</p>
            <p className="text-lg font-bold">
              ₴ 2500
              <span className="text-muted-foreground text-sm font-normal">
                /hour
              </span>
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">Category</p>
            <p className="font-medium text-sm">Family</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">Delivery time</p>
            <p className="inline-flex gap-1 items-center font-medium text-sm">
              <ClockIcon className="w-4 text-muted-foreground" />5 days
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-xs mb-1">Deliverables</p>
            <p className="inline-flex gap-1 items-center font-medium text-sm">
              <PackageIcon className="text-muted-foreground w-4" /> 100 edited
              photos, +2 more
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-sm mb-1">Status</p>
            <VisibilityBadge isPublic />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Button variant="outline">
          <EditIcon /> Edit
        </Button>
        <Button variant="ghost">
          <TrashIcon /> Delete
        </Button>
      </div>
    </Card>
  );
}

export default ServiceCard;
