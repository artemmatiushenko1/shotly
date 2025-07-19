import { Button } from '@shotly/ui/components/button';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { Textarea } from '@shotly/ui/components/textarea';
import {
  CaseSensitiveIcon,
  Folder,
  MapPinIcon,
  Plus,
  TagIcon,
  TextIcon,
} from 'lucide-react';

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
          <div className="pt-1 space-y-5 grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">
                <CaseSensitiveIcon className="size-4" /> Collection Name{' '}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Enter collection name"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">
                <TextIcon className="size-4" /> Description{' '}
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Textarea
                showCharsCount
                maxChars={500}
                placeholder="Add description for your collection"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">
                <TagIcon className="size-4" /> Category
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Wedding">Wedding</SelectItem>
                    <SelectItem value="Portrait">Portrait</SelectItem>
                    <SelectItem value="Love Story">Love Story</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Reportage">Reportage</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Architecture">Architecture</SelectItem>
                    <SelectItem value="Content">Content</SelectItem>
                    {/* TODO: show text input if other selected */}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">
                <MapPinIcon className="size-4" /> Location{' '}
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input placeholder="Add location (e.g. Kyiv, Ukraine)" />
            </div>
          </div>
          <DialogFooter className="mt-2">
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
