'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Collection } from '@/entities/models/collection';
import { Service } from '@/entities/models/service';
import { UserProfile } from '@/entities/models/user';
import { AuthenticatedUser } from '@/infrastructure/services/auth/dal';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shotly/ui/components/tabs';

import SeePorfolio from './see-portfolio/see-porfolio';
import SeeReviews from './see-reviews/see-reviews';
import SeeServices from './see-services/see-services';

type ProfileTabsProps = {
  collections: Collection[];
  services: Service[];
  user?: AuthenticatedUser;
  photographerProfile: UserProfile;
};

enum ProfileTab {
  PORTFOLIO = 'portfolio',
  SERVICES = 'services',
  REVIEWS = 'reviews',
}

const ProfileTabs = (props: ProfileTabsProps) => {
  const { collections, services, user, photographerProfile } = props;

  const t = useTranslations('photographerProfile.tabs');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(
    (searchParams.get('tab') as ProfileTab) || ProfileTab.PORTFOLIO,
  );

  useEffect(() => {
    const tabParam = searchParams.get('tab') as ProfileTab;
    if (
      tabParam &&
      [ProfileTab.PORTFOLIO, ProfileTab.SERVICES, ProfileTab.REVIEWS].includes(
        tabParam,
      )
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as ProfileTab);
    router.replace(`${pathname}?tab=${value}`, { scroll: false });
  };

  const tabs = [
    {
      name: t('portfolio'),
      value: ProfileTab.PORTFOLIO,
      content: <SeePorfolio collections={collections} />,
    },
    {
      name: t('services'),
      value: ProfileTab.SERVICES,
      content: (
        <SeeServices
          services={services}
          user={user}
          photographerProfile={photographerProfile}
        />
      ),
    },
    {
      name: t('reviews'),
      value: ProfileTab.REVIEWS,
      content: <SeeReviews />,
    },
  ];

  return (
    <div className="w-full" id="profile-tabs">
      <Tabs className="gap-4" value={activeTab} onValueChange={handleTabChange}>
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
