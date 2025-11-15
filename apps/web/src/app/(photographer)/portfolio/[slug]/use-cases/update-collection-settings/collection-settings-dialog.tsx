'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { Separator } from '@shotly/ui/components/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shotly/ui/components/tabs';
import { LockIcon, SettingsIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Category } from '@/domain/category';
import { Collection } from '@/domain/collection';
import { useTranslations } from 'next-intl';
import GeneralCollectionSettings from './general';
import AccessAndVisibilitySettings from './access-and-visibility';
import DangerZoneSettings from './danger-zone';
import { CollectionSettingsLoadingProvider } from './loading.context';

type CollectionSettingsDialogProps = {
  children: React.ReactNode;
  collection: Collection;
  categories: Category[];
};

function CollectionSettingsDialog(props: CollectionSettingsDialogProps) {
  const { children, categories, collection } = props;

  const t = useTranslations('portfolio.collectionDetails.settings');

  const [open, setOpen] = useState(false);

  const tabs = [
    {
      name: t('tabs.general.name'),
      value: 'general',
      description: t('tabs.general.description'),
      icon: <SettingsIcon />,
      content: (
        <GeneralCollectionSettings
          collection={collection}
          categories={categories}
        />
      ),
    },
    {
      name: t('tabs.visibility.name'),
      value: 'access-and-visibility',
      description: t('tabs.visibility.description'),
      icon: <LockIcon />,
      content: (
        <AccessAndVisibilitySettings
          defaultVisibility={collection.visibilityStatus}
          collectionId={collection.id}
        />
      ),
    },
    {
      name: t('tabs.dangerZone.name'),
      value: 'danger-zone',
      description: t('tabs.dangerZone.description'),
      icon: <TrashIcon />,
      content: <DangerZoneSettings collection={collection} />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[600px] sm:max-w-[700px] p-0 overflow-hidden">
        <CollectionSettingsLoadingProvider>
          <Tabs defaultValue="general" className="flex-row h-full gap-0">
            <div className="p-4 pt-8 flex-1/3">
              <DialogHeader className="mb-4">
                <DialogTitle>{t('title')}</DialogTitle>
              </DialogHeader>
              <div>
                <TabsList className="bg-background h-full flex-col w-full">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="py-3 gap-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 w-full data-[state=active]:shadow-none dark:data-[state=active]:border-transparent justify-start rounded-md"
                    >
                      {tab.icon}
                      {tab.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            <Separator orientation="vertical" className="mr-0" />
            <div className="py-4 px-6 pt-8 flex-2/3 bg-accent/25 flex flex-col">
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 flex-col flex"
                >
                  {tab.content}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </CollectionSettingsLoadingProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CollectionSettingsDialog;
