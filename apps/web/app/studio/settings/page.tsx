import { LockIcon, Settings2Icon, UserIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import languagesRepository from '@/infrastructure/repositories/languages.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';
import { getUser } from '@/infrastructure/services/auth/dal';

import FadeIn from '@shotly/ui/components/fade-in';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shotly/ui/components/tabs';

import MainHeader from '../../_components/main-header';
import { GeneralSettings } from './general';
import { PrivacyAndSecuritySettings } from './privacy-and-security';
import { ProfileSettings } from './profile';

const getProfileTabData = (userId: string) => {
  return Promise.all([
    usersRepository.getUserProfile(userId),
    languagesRepository.getAllLanguages(),
  ]);
};

const Settings = async () => {
  const user = await getUser();
  const t = await getTranslations('settings');

  const [profile, languages] = await getProfileTabData(user.id);

  return (
    <>
      <MainHeader title={t('title')} caption={t('caption')} />
      <div className="px-4">
        <Tabs defaultValue="profile">
          <TabsList className="my-4">
            <TabsTrigger value="profile">
              <UserIcon /> {t('tabs.profile')}
            </TabsTrigger>
            <TabsTrigger value="general">
              <Settings2Icon /> {t('tabs.general')}
            </TabsTrigger>
            <TabsTrigger value="privacy-and-security">
              <LockIcon />
              {t('tabs.privacyAndSecurity')}
            </TabsTrigger>
          </TabsList>
          <FadeIn>
            <TabsContent value="general">
              <GeneralSettings userEmail={user.email} />
            </TabsContent>
            <TabsContent value="profile">
              <ProfileSettings
                profile={profile}
                languageOptions={languages}
                userId={user.id}
              />
            </TabsContent>
            <TabsContent value="privacy-and-security">
              <PrivacyAndSecuritySettings />
            </TabsContent>
          </FadeIn>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
