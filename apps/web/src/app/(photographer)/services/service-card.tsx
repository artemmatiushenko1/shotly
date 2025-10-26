import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@shotly/ui/components/card';
import Image from 'next/image';
import React from 'react';
import { VisibilityBadge } from '../portfolio/visibility-badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';
import { ClockIcon, EllipsisVerticalIcon } from 'lucide-react';
import { Badge } from '@shotly/ui/components/badge';
import { Button } from '@shotly/ui/components/button';

function ServiceCard() {
  return (
    <Card className="shadow-none pt-0 overflow-hidden">
      <div className="relative">
        <Image
          alt=""
          src="/auth-banner-2.jpg"
          width={200}
          height={200}
          className="w-full h-50 object-cover"
        />
        <VisibilityBadge isPublic className="absolute top-6 left-6" />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full w-10 h-10 p-0 text-background size-8"
          >
            <EllipsisVerticalIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <CardContent>
        <CardTitle>Family photoset</CardTitle>
        <CardDescription className="mb-2">
          Photo on a plain background. From 20 photos. Minimal editing: Basic
          cleaning of photo...
        </CardDescription>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">
            ₴ 2500
            <span className="text-muted-foreground text-sm font-normal">
              /hour
            </span>
          </p>
          <Tooltip>
            <TooltipContent>Deliverables receive duration</TooltipContent>
            <TooltipTrigger className="items-start">
              <p className="text-sm inline-flex gap-1 items-center">
                <ClockIcon className="w-4 text-muted-foreground" />5 days
              </p>
            </TooltipTrigger>
          </Tooltip>
          <Badge variant="outline">Family</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;
