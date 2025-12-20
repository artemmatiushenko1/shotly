import { getTranslations } from 'next-intl/server';

import { Card, CardContent, CardHeader } from '@shotly/ui/components/card';
import { Skeleton } from '@shotly/ui/components/skeleton';

import GradientLoadingProgress from '../../_components/gradient-progress';
import MainHeader from '../../_components/main-header';

export async function Loading() {
  const t = await getTranslations('orders');

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-50">
        <GradientLoadingProgress />
      </div>
      <MainHeader title={t('title')} caption={t('caption')} />
      <div className="px-4 mt-4 flex gap-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="shadow-none pb-0 overflow-hidden border-transparent"
          >
            <CardHeader className="flex justify-between">
              <div>
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
              <div>
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="shadow-none flex flex-row items-center gap-4 mb-4">
                <Skeleton className="size-[60px] rounded-sm shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-3 w-full max-w-md" />
                </div>
                <div className="ml-auto mr-2">
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Loading;
