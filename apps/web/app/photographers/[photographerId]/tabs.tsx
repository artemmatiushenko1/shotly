'use client';

import { useTranslations } from 'next-intl';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shotly/ui/components/tabs';

import SeePorfolio from './see-portfolio/see-porfolio';
import SeeReviews from './see-reviews/see-reviews';
import SeeServices from './see-services/see-services';

const ProfileTabs = () => {
  const t = useTranslations('photographerProfile.tabs');

  const tabs = [
    {
      name: t('portfolio'),
      value: 'portfolio',
      content: <SeePorfolio />,
    },
    {
      name: t('services'),
      value: 'services',
      content: <SeeServices />,
    },
    {
      name: t('reviews'),
      value: 'reviews',
      content: <SeeReviews />,
    },
  ];

  return (
    <div className="w-full">
      <Tabs defaultValue="portfolio" className="gap-4">
        <TabsList className="bg-background rounded-none border-b p-0 w-full justify-start">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-background flex-0 data-[state=active]:bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-muted-foreground/30 h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
