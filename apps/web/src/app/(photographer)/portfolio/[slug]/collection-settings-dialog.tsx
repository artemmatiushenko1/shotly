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

type CollectionSettingsDialogProps = {
  children: React.ReactNode;
};

function CollectionSettingsDialog(props: CollectionSettingsDialogProps) {
  const { children } = props;

  const [open, setOpen] = useState(false);

  const tabs = [
    {
      name: 'General',
      value: 'general',
      icon: <SettingsIcon />,
      content: null,
    },
    {
      name: 'Access & Visibility',
      value: 'access-and-visibility',
      icon: <LockIcon />,
      content: null,
    },
    {
      name: 'Danger Zone',
      value: 'danger-zone',
      icon: <TrashIcon />,
      content: null,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[600px] sm:max-w-[700px] p-0">
        <Tabs defaultValue="general" className="flex-row h-full gap-0">
          <div className="p-4 pt-8 flex-1/3">
            <DialogHeader className="mb-4">
              <DialogTitle>Settings</DialogTitle>
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
          <div className="p-4 pt-8 bg-accent/25 flex-2/3">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <p className="text-muted-foreground text-sm">{tab.content}</p>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default CollectionSettingsDialog;
