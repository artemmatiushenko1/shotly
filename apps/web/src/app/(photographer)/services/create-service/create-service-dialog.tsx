import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { HandshakeIcon } from 'lucide-react';
import React from 'react';
import CreateServiceForm from './create-service-form';
import { Button } from '@shotly/ui/components/button';
import { Category } from '@/domain/category';

type CreateServiceDialogProps = {
  categories: Category[];
  children: React.ReactNode;
};

function CreateServiceDialog(props: CreateServiceDialogProps) {
  const { children: trigger, categories } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[650px] h-[600px] overflow-y-scroll flex flex-col">
        <DialogHeader className="flex-row space-x-2 mb-2">
          <div className="size-8 p-2 bg-primary/15 rounded-md ">
            <HandshakeIcon className="text-primary size-4" />
          </div>
          <div>
            <DialogTitle className="mb-1">Create a service</DialogTitle>
            <DialogDescription>
              A collection is a group of photos from a single project. Fill in
              the details below to add a new one to your portfolio.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex-1">
          <CreateServiceForm categories={categories} />
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateServiceDialog;
