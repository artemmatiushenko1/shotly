'use client';

import { Card, CardContent } from '@shotly/ui/components/card';
import { Skeleton } from '@shotly/ui/components/skeleton';
import { cn } from '@shotly/ui/lib/utils';

type PhotographerCardSkeletonProps = {
  className?: string;
};

function PhotographerCardSkeleton({
  className,
}: PhotographerCardSkeletonProps) {
  return (
    <Card
      className={cn('overflow-hidden shadow-none py-0 border-none', className)}
    >
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start justify-between p-4 pb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Skeleton className="size-12 rounded-full shrink-0" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        {/* Portfolio Images */}
        <div className="px-4 pb-3">
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="aspect-[4/3] rounded-lg" />
            <Skeleton className="aspect-[4/3] rounded-lg" />
          </div>
        </div>

        {/* Footer Stats */}
        <div className="px-4 pb-4 pt-2 border-t border-transparent">
          <div className="grid grid-cols-3 gap-4">
            {/* Rating */}
            <div className="flex flex-col">
              <Skeleton className="h-3 w-12 mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>

            {/* Pricing */}
            <div className="flex flex-col">
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PhotographerCardSkeleton;
