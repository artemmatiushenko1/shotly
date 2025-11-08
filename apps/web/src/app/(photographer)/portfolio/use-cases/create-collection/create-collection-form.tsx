'use client';

import { useState, useActionState, useId } from 'react';
import { Category } from '@/domain/category';
import { Button } from '@shotly/ui/components/button';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shotly/ui/components/popover';
import { Calendar } from '@shotly/ui/components/calendar';
import { CalendarIcon } from 'lucide-react';
import dayjs from 'dayjs';
import { createCollection } from './actions';
import { cn } from '@shotly/ui/lib/utils';
import { Collection } from '@/domain/collection';

enum FormField {
  NAME = 'name',
  DESCRIPTION = 'description',
  CATEGORY_ID = 'categoryId',
  SHOOT_DATE = 'shootDate',
}

type CreateCollectionFormProps = {
  defaultValues?: Collection;
  className?: string;
  categories: Category[];
  submitButtonText?: string;
  onCancel: () => void;
};

function CreateCollectionForm(props: CreateCollectionFormProps) {
  const {
    defaultValues,
    categories,
    submitButtonText = 'Continue',
    onCancel,
    className,
  } = props;

  const [shootDate, setShootDate] = useState<Date | undefined>(
    defaultValues?.shootDate,
  );
  const [categoryId, setCategoryId] = useState<string>(
    defaultValues?.categoryId ?? '',
  );

  const [state, formAction, pending] = useActionState(createCollection, {
    hasErrors: false,
    validationErrors: undefined,
  });

  const { validationErrors } = state;

  const nameId = useId();
  const descriptionId = useId();
  const categoryIdInputId = useId();
  const shootDateId = useId();

  return (
    <form
      className={cn('space-y-5 flex flex-col', className)}
      action={formAction}
    >
      <div className="grid gap-3">
        <Label htmlFor={nameId}>Collection Name</Label>
        <Input
          id={nameId}
          name={FormField.NAME}
          placeholder="Enter collection name"
          defaultValue={defaultValues?.name}
          error={validationErrors?.fieldErrors.name?.toString()}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor={descriptionId}>Description</Label>
        <Textarea
          id={descriptionId}
          name={FormField.DESCRIPTION}
          showCharsCount
          maxChars={500}
          placeholder="Add description for your collection"
          defaultValue={defaultValues?.description ?? undefined}
          error={validationErrors?.fieldErrors.description?.toString() ?? ''}
        />
      </div>
      <div className="flex space-x-3 items-start">
        <div className="grid gap-3 w-full">
          <Label htmlFor={categoryIdInputId}>Category</Label>
          <Select value={categoryId ?? ''} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full" id={categoryIdInputId}>
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
            <div className="text-sm text-destructive mt-2">
              {validationErrors?.fieldErrors.categoryId?.toString()}
            </div>
          )}
          <input
            type="hidden"
            name={FormField.CATEGORY_ID}
            value={categoryId}
          />
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor={shootDateId}>Shoot Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={shootDateId}
                type="button"
                variant="outline"
                data-empty={!shootDate}
                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
              >
                {shootDate ? (
                  dayjs(shootDate).format('MMMM D, YYYY')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto size-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={shootDate}
                onSelect={setShootDate}
                captionLayout="dropdown"
                startMonth={new Date(2000, 0)}
                endMonth={new Date(new Date().getFullYear(), 11)}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
          {shootDate && (
            <input
              type="hidden"
              name={FormField.SHOOT_DATE}
              value={shootDate.toISOString()}
            />
          )}
          {validationErrors?.fieldErrors.shootDate?.toString() && (
            <div className="text-sm text-destructive mt-2">
              {validationErrors?.fieldErrors.shootDate?.toString()}
            </div>
          )}
          {/* TODO: add tags input */}
        </div>
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-auto pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={pending}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
}

export default CreateCollectionForm;
