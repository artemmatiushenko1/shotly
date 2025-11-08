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
import CreateCollectionForm from '../use-cases/create-collection/create-collection-form';
import { Category } from '@/domain/category';
import { Collection } from '@/domain/collection';
import { RadioGroup, RadioGroupItem } from '@shotly/ui/components/radio-group';
import { Label } from '@shotly/ui/components/label';
import { Button } from '@shotly/ui/components/button';

type CollectionSettingsDialogProps = {
  children: React.ReactNode;
  collection: Collection;
  categories: Category[];
};

function CollectionSettingsDialog(props: CollectionSettingsDialogProps) {
  const { children, categories, collection } = props;

  const [open, setOpen] = useState(false);

  const tabs = [
    {
      name: 'General',
      value: 'general',
      description: 'Manage the general settings of your collection',
      icon: <SettingsIcon />,
      content: (
        <div>
          <p className="text-md font-medium">Edit Collection Details</p>
          <p className="text-muted-foreground text-xs mb-6">
            Update the name, description, and other details.
          </p>
          <CreateCollectionForm
            defaultValues={collection}
            className="flex-1"
            categories={categories}
            submitButtonText="Save"
            onCancel={() => setOpen(false)}
          />
        </div>
      ),
    },
    {
      name: 'Access & Visibility',
      value: 'access-and-visibility',
      description: 'Manage the access and visibility of your collection',
      icon: <LockIcon />,
      content: (
        <div>
          <p className="text-md font-medium">Collection Privacy</p>
          <p className="text-muted-foreground text-xs mb-6">
            Choose who can see your collection.
          </p>
          <RadioGroup defaultValue="basic">
            <div className="flex gap-2">
              <RadioGroupItem value="basic" id="plan-basic" />
              <div className="grid flex-1 space-y-2">
                <Label htmlFor="plan-basic">Public</Label>
                <p className="text-muted-foreground text-xs">
                  Visible on your public profile and in search results.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <RadioGroupItem value="pro" id="plan-pro" />
              <div className="grid flex-1 space-y-2">
                <Label htmlFor="plan-pro">Private</Label>
                <p className="text-muted-foreground text-xs">
                  Only visible to you and anyone with the private share link.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
    },
    {
      name: 'Danger Zone',
      value: 'danger-zone',
      description: 'Manage the danger zone of your collection',
      icon: <TrashIcon />,
      content: (
        <div>
          <p className="text-md font-medium">Delete this collection</p>
          <p className="text-muted-foreground text-xs mb-6">
            Once you delete a collection, you cannot get it back. All photos and
            data associated with it will be permanently removed.
          </p>
          <Button variant="destructive">
            <TrashIcon /> Delete Collection &quot;{collection.name}&quot;
          </Button>
        </div>
      ),
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
      </DialogContent>
    </Dialog>
  );
}

export default CollectionSettingsDialog;
