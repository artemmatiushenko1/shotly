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

const getProfileTabData = (userId: string) => {
  return Promise.all([
    usersRepository.getUserProfile(userId),
    languagesRepository.getAllLanguages(),
  ]);
};

const Settings = async () => {
  const user = await getUser();

  const [profile, languages] = await getProfileTabData(user.id);

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
