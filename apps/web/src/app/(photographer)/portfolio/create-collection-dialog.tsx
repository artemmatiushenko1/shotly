import { Button } from '@shotly/ui/components/button';
import { DatePicker } from '@shotly/ui/components/date-picker';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { Input } from '@shotly/ui/components/input';
import { Label } from '@shotly/ui/components/label';
import { Textarea } from '@shotly/ui/components/textarea';
import { Folder, Plus } from 'lucide-react';

const CreateCollectionDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="ml-auto">
            <Plus />
            New Collection
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="flex-row space-x-2">
            <div className="size-8 p-2 bg-primary/15 rounded-md ">
              <Folder className="text-primary size-4" />
            </div>
            <div>
              <DialogTitle className="mb-1">Create new collection</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="pt-1">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Collection Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="Enter collection name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Description</Label>
                <Textarea placeholder="Add description for your collection..." />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Date</Label>
                <DatePicker />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export { CreateCollectionDialog };
