import CoverUpload from '@/components/cover-upload/cover-upload';
import { Input } from '@shotly/ui/components/input';
import { Label } from '@shotly/ui/components/label';
import { Switch } from '@shotly/ui/components/switch';
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
import React, { useId, useState } from 'react';
import { Button } from '@shotly/ui/components/button';
import { PlusCircleIcon } from 'lucide-react';
import { Badge } from '@shotly/ui/components/badge';

// TODO: idea is to add list of features,
// user can select which ones are included in base price, and what might be included additionally
function CreateServiceForm() {
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [deliverable, setDeliverable] = useState('');

  const nameId = useId();
  const descriptionId = useId();

  return (
    <form className="space-y-5 pb-10">
      <div className="grid gap-3">
        <Label htmlFor={nameId}>
          Service Name <span className="text-destructive">*</span>
        </Label>
        <Input id={nameId} name="name" placeholder="Enter service name" />
      </div>
      <div className="grid gap-3">
        <Label>
          Upload cover image <span className="text-destructive">*</span>
        </Label>
        <CoverUpload />
      </div>
      <div className="grid gap-3">
        <Label htmlFor={descriptionId}>
          Description{' '}
          <span className="text-xs text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id={descriptionId}
          showCharsCount
          maxChars={500}
          placeholder="Add description for your collection"
        />
      </div>
      <div className="flex space-x-3">
        <div className="grid gap-3 w-full">
          <Label htmlFor="username-1">Category</Label>
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
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor="username-1">Price </Label>
          <Input placeholder="Enter price" />
        </div>
      </div>
      <div className="grid gap-3 w-full">
        <Label htmlFor="username-1">Deliverables</Label>
        <div className="w-full flex gap-3">
          <Input
            placeholder="Specify deliverables"
            value={deliverable}
            onChange={(e) => setDeliverable(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={() => setDeliverables((prev) => [...prev, deliverable])}
          >
            <PlusCircleIcon />
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {deliverables.map((deliverable) => (
            <Badge key={deliverable} variant="secondary">
              {deliverable}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid gap-3 w-full">
        <Label htmlFor="username-1">Delivery Time (days) </Label>
        <Input placeholder="Add location (e.g. Kyiv, Ukraine)" />
      </div>
      <div className="w-full flex justify-between">
        <div>
          <Label htmlFor="username-1" className="mb-1">
            Visibility
          </Label>
          <p className="text-muted-foreground text-xs">
            When enabled this service will be visible to any visitor <br />
            of the platflorm
          </p>
        </div>
        <Switch />
      </div>
    </form>
  );
}

export default CreateServiceForm;
