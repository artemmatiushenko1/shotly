import MainHeader from '@/components/main-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shotly/ui/components/tabs';
import { ProfileSettings } from './profile';
import { PrivacyAndSecuritySettings } from './privacy-and-security';
import { GeneralSettings } from './general';
import { LockIcon, Settings2Icon, UserIcon } from 'lucide-react';
import usersRepository from '@/repositories/users.repository';
import languagesRepository from '@/repositories/languages.repository';
import { getUser } from '@/lib/auth/get-user';
import { getTranslations } from 'next-intl/server';

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
          <TabsList className="my-3">
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
          {/* TODO: create a wrapper component for animation */}
          <div className="animate-in fade-in duration-300">
            <TabsContent value="general">
              <GeneralSettings />
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
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
