'use client';

import { Skeleton } from '@shotly/ui/components/skeleton';

import GradientLoadingProgress from '../../../_components/gradient-progress';

const Loading = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-50">
        <GradientLoadingProgress />
      </div>
      <div className="h-full flex flex-col">
        <div className="p-3 pt-5 space-y-6">
          {/* Cover area with back/settings buttons */}
          <div className="relative w-full overflow-hidden rounded-xl bg-muted">
            <Skeleton className="w-full h-60" />
            <div className="absolute inset-0">
              <div className="absolute left-5 top-5">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="absolute right-5 top-5">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-2 px-3">
            <Skeleton className="h-8 w-2/3 mb-1" />
            <Skeleton className="h-5 w-1/2 mb-3" />
            <div className="flex gap-3 mb-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>

        {/* Photos grid skeleton */}
        <div className="max-w-7xl px-4 sm:px-6 lg:px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="aspect-[3/4] w-full rounded-xl h-48"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
