import { LockIcon, Settings2Icon, UserIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Locale } from '@/_i18n/config';
import { getLocale } from '@/_i18n/locale';
import { getAllLanguagesUseCase } from '@/application/use-cases/languages';
import { getProfileByUsernameOrIdUseCase } from '@/application/use-cases/public-profile';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';

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

const getProfileTabData = (userId: string, locale: Locale) => {
  return Promise.all([
    getProfileByUsernameOrIdUseCase(userId, locale),
    getAllLanguagesUseCase(locale),
  ]);
};

const Settings = async () => {
  const user = await getAuthenticatedUserOrRedirect();
  const t = await getTranslations('settings');
  const locale = await getLocale();

  const [profile, languages] = await getProfileTabData(user.id, locale);

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
