'use client';

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
import React, { useActionState, useId, useState } from 'react';
import { Button } from '@shotly/ui/components/button';
import { PlusCircleIcon } from 'lucide-react';
import { Badge } from '@shotly/ui/components/badge';
import { Category } from '@/domain/category';
import { ServiceStatus } from '@/domain/service';
import { createService } from './actions';

enum FormField {
  NAME = 'name',
  COVER_IMAGE = 'coverImage',
  DESCRIPTION = 'description',
  CATEGORY_ID = 'categoryId',
  PRICE = 'price',
  FEATURES = 'features',
  DELIVERY_TIME_IN_DAYS = 'deliveryTimeInDays',
  STATUS = 'status',
}

// TODO: idea is to add list of features,
// user can select which ones are included in base price, and what might be included additionally
type CreateServiceFormProps = {
  categories: Category[];
  onCancel: () => void;
};

function CreateServiceForm(props: CreateServiceFormProps) {
  const { categories, onCancel } = props;

  const [state, formAction, pending] = useActionState(createService, {
    hasErrors: false,
    validationErrors: undefined,
  });

  const { validationErrors } = state;

  const [features, setFeatures] = useState<string[]>([]);
  const [feature, setfeature] = useState('');

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.PRIVATE);

  const nameId = useId();
  const descriptionId = useId();
  const priceId = useId();
  const featuresId = useId();
  const deliveryTimeId = useId();

  return (
    <form className="space-y-5" action={formAction}>
      <div className="grid gap-3">
        <Label htmlFor={nameId}>
          Service Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={nameId}
          name={FormField.NAME}
          placeholder="Enter service name"
          error={validationErrors?.fieldErrors.name?.toString()}
        />
      </div>
      <div className="grid gap-3">
        <Label>
          Upload cover image <span className="text-destructive">*</span>
        </Label>
        <CoverUpload
          name={FormField.COVER_IMAGE}
          error={validationErrors?.fieldErrors.coverImage?.toString()}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor={descriptionId}>
          Description{' '}
          <span className="text-xs text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          showCharsCount
          name={FormField.DESCRIPTION}
          id={descriptionId}
          maxChars={500}
          placeholder="Add description for your collection"
          error={validationErrors?.fieldErrors.description?.toString() ?? ''}
        />
      </div>
      <div className="flex space-x-3 items-start">
        <div className="grid gap-3 w-full">
          <Label htmlFor="username-1">Category</Label>
          <Select value={categoryId ?? undefined} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {validationErrors?.fieldErrors.categoryId?.toString() && (
            // TODO: create common component for this form error
            <div className="text-sm text-destructive mt-2">
              {validationErrors?.fieldErrors.categoryId?.toString()}
            </div>
          )}
          <input
            type="hidden"
            name={FormField.CATEGORY_ID}
            value={categoryId ?? undefined}
          />
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor={priceId}>Price </Label>
          <Input
            placeholder="Enter price"
            name={FormField.PRICE}
            id={priceId}
            error={validationErrors?.fieldErrors.price?.toString()}
          />
        </div>
      </div>
      <div className="grid gap-3 w-full">
        <Label htmlFor={featuresId}>Features list</Label>
        {/* TODO: Specify UX friendly description for this field (what are features etc.) */}
        <div className="w-full flex gap-3">
          <Input
            placeholder="Specify features"
            value={feature}
            onChange={(e) => setfeature(e.target.value)}
            id={featuresId}
            className="flex-1"
            error={validationErrors?.fieldErrors.features?.toString()}
          />
          <Button
            type="button"
            onClick={() => setFeatures((prev) => [...prev, feature])}
          >
            <PlusCircleIcon />
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {features.map((feature) => (
            <Badge key={feature} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
        <input
          type="hidden"
          name={FormField.FEATURES}
          value={features.join(',')}
        />
      </div>
      <div className="grid gap-3 w-full">
        <Label htmlFor={deliveryTimeId}>Delivery Time (full days) </Label>
        <Input
          type="number"
          min={1}
          max={60}
          placeholder="Enter delivery time"
          name={FormField.DELIVERY_TIME_IN_DAYS}
          id={deliveryTimeId}
          error={validationErrors?.fieldErrors.deliveryTimeInDays?.toString()}
        />
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
        <Switch
          checked={status === ServiceStatus.PUBLIC}
          onCheckedChange={(checked) =>
            setStatus(checked ? ServiceStatus.PUBLIC : ServiceStatus.PRIVATE)
          }
        />
        <input type="hidden" name={FormField.STATUS} value={status} />
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-auto pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={pending}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default CreateServiceForm;
