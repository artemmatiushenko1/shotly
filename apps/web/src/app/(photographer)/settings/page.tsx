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

const Settings = () => {
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
          {/* <Separator /> */}
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileSettings />
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
