import MainHeader from '@/components/main-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shotly/ui/components/tabs';
import { Skeleton } from '@shotly/ui/components/skeleton';
import { LockIcon, Settings2Icon, UserIcon } from 'lucide-react';
import GradientLoadingProgress from '@/components/gradient-progress';
import { getTranslations } from 'next-intl/server';

export async function Loading() {
  const t = await getTranslations('settings');

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-50">
        <GradientLoadingProgress />
      </div>
      <MainHeader title={t('title')} caption={t('caption')} />
      <div className="px-4">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile" disabled>
              <UserIcon /> {t('tabs.profile')}
            </TabsTrigger>
            <TabsTrigger value="general" disabled>
              <Settings2Icon /> {t('tabs.general')}
            </TabsTrigger>
            <TabsTrigger value="privacy-and-security" disabled>
              <LockIcon />
              {t('tabs.privacyAndSecurity')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-6">
              <div className="space-y-7">
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-15 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-15 w-full" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="general">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </TabsContent>
          <TabsContent value="privacy-and-security">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Loading;
