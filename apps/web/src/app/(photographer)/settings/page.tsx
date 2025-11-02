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
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { UnauthenticatedError } from '@/domain/errors/auth';
import languagesRepository from '@/repositories/languages.repository';

const getProfileTabData = (userId: string) => {
  return Promise.all([
    usersRepository.getUserProfile(userId),
    languagesRepository.getAllLanguages(),
  ]);
};

const Settings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnauthenticatedError('User is not authenticated!');
  }

  const userId = session.user.id;

  const [profile, languages] = await getProfileTabData(userId);

  return (
    <>
      <MainHeader
        title="Settings"
        caption="Manage your details and personal preferences here"
      />
      <div className="px-4">
        <Tabs defaultValue="profile">
          <TabsList className="my-3">
            <TabsTrigger value="profile">
              <UserIcon /> Profile
            </TabsTrigger>
            <TabsTrigger value="general">
              <Settings2Icon /> General
            </TabsTrigger>
            <TabsTrigger value="privacy-and-security">
              <LockIcon />
              Privacy & Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileSettings profile={profile} languageOptions={languages} />
          </TabsContent>
          <TabsContent value="privacy-and-security">
            <PrivacyAndSecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
