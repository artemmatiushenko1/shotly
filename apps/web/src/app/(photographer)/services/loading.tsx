import MainHeader from '@/components/main-header';
import GradientLoadingProgress from '@/components/gradient-progress';
import { Badge } from '@shotly/ui/components/badge';
import { Button } from '@shotly/ui/components/button';
import { Skeleton } from '@shotly/ui/components/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import { PlusIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function Loading() {
  const t = await getTranslations('services');

  const tabs = [
    t('filters.All'),
    t('filters.Public'),
    t('filters.Private'),
    t('filters.Archived'),
  ];

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-50">
        <GradientLoadingProgress />
      </div>
      <MainHeader
        title={t('title')}
        caption={t('caption')}
        extra={
          <Button className="ml-auto" disabled>
            <PlusIcon />
            {t('createService')}
          </Button>
        }
      />
      <div className="p-4 pt-0">
        <div className="flex flex-col">
          <Tabs defaultValue="All">
            <TabsList className="my-4">
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab} disabled>
                  {tab}{' '}
                  <Badge
                    variant="secondary"
                    className="h-5 min-w-5 rounded-full px-1"
                  >
                    <Skeleton className="h-3 w-3" />
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="shadow-none py-0 overflow-hidden flex-row gap-4 flex rounded-xl"
              >
                <div className="relative p-2 overflow-hidden">
                  <Skeleton className="size-40 w-50 object-cover rounded-lg" />
                </div>
                <div className="p-3 flex flex-col justify-between flex-1">
                  <div>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-full max-w-lg" />
                  </div>
                  <div className="flex items-center justify-start gap-10">
                    <div className="flex flex-col">
                      <Skeleton className="h-3 w-12 mb-1" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="flex flex-col items-start">
                      <Skeleton className="h-3 w-16 mb-1" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex flex-col items-start">
                      <Skeleton className="h-3 w-20 mb-1" />
                      <Skeleton className="h-6 w-28" />
                    </div>
                    <div className="flex flex-col items-start">
                      <Skeleton className="h-3 w-20 mb-1" />
                      <Skeleton className="h-6 w-48" />
                    </div>
                    <div className="flex flex-col items-start">
                      <Skeleton className="h-3 w-12 mb-1" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;
