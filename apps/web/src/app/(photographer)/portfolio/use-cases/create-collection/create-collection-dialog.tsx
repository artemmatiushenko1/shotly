'use client';

import { Category } from '@/domain/category';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { Folder } from 'lucide-react';
import CreateCollectionForm from './create-collection-form';
import { useState } from 'react';

type CreateCollectionDialogProps = {
  categories: Category[];
  children: React.ReactNode;
};

const CreateCollectionDialog = (props: CreateCollectionDialogProps) => {
  const { children: trigger, categories } = props;

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="flex-row space-x-2 mb-2">
          <div className="size-8 p-2 bg-primary/15 rounded-md ">
            <Folder className="text-primary size-4" />
          </div>
          <div>
            <DialogTitle className="mb-1">Create new collection</DialogTitle>
            <DialogDescription>
              A collection is a group of photos from a single project. Fill in
              the details below to add a new one to your portfolio.
            </DialogDescription>
          </div>
        </DialogHeader>
        <CreateCollectionForm
          categories={categories}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export { CreateCollectionDialog };
