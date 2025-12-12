import { getTranslations } from 'next-intl/server';

import { Card, CardContent } from '@shotly/ui/components/card';
import { Skeleton } from '@shotly/ui/components/skeleton';

import GradientLoadingProgress from '../../_components/gradient-progress';
import MainHeader from '../../_components/main-header';

export async function Loading() {
  const t = await getTranslations('portfolio');

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-50">
        <GradientLoadingProgress />
      </div>
      <div className="h-full flex flex-col">
        <MainHeader title={t('title')} caption={t('caption')} />
        <div className="animate-in fade-in duration-300">
          {/* Toolbar Skeleton */}
          <div className="flex gap-4 p-4 py-0 items-center flex-wrap">
            <div className="flex gap-2 my-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-20 rounded-md" />
              ))}
            </div>
            <div className="flex-1 max-w-[300px] ml-auto min-w-[200px]">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <Skeleton className="h-10 w-[200px] rounded-md" />
            <Skeleton className="h-10 w-[150px] rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="rounded-xl shadow-none overflow-hidden p-0 gap-0 border-none bg-transparent"
              >
                <div className="relative">
                  <div className="p-2">
                    <Skeleton className="w-full h-48 rounded-md" />
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <div className="flex justify-between gap-6">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;
