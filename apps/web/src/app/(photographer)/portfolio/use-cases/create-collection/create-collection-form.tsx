'use client';

import { useState } from 'react';
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

type CreateCollectionFormProps = {
  categories: Category[];
  onCancel: () => void;
};

function CreateCollectionForm(props: CreateCollectionFormProps) {
  const { categories, onCancel } = props;
  const [shootDate, setShootDate] = useState<Date | undefined>();

  return (
    <form className="space-y-5">
      <div className="grid gap-3">
        <Label htmlFor="name-1">Collection Name</Label>
        <Input id="name-1" name="name" placeholder="Enter collection name" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username-1">Description</Label>
        <Textarea
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
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor="shoot-date">Shoot Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="shoot-date"
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
          {/* TODO: add tags input */}
          {shootDate && (
            <input
              type="hidden"
              name="shootDate"
              value={shootDate.toISOString()}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-auto pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={false}>
          Continue
        </Button>
      </div>
    </form>
  );
}

export default CreateCollectionForm;
