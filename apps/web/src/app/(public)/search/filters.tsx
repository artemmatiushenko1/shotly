import React from 'react';
import { LabeledSelect } from './labeled-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import CountSelect from './count-select';
import { Input } from '@shotly/ui/components/input';

function Filters() {
  return (
    <div className="sticky top-0 z-10 bg-background">
      <div className="py-4 lg:grid lg:grid-cols-4 lg:gap-4">
        <LabeledSelect
          label="I'm looking for"
          placeholder="Select category"
          className="max-w-xs"
          defaultValue="any"
        >
          <SelectItem value="any">Any Category</SelectItem>
          <SelectItem value="1">Credit Card</SelectItem>
          <SelectItem value="2">Google Pay</SelectItem>
          <SelectItem value="3">PayPal</SelectItem>
          <SelectItem value="4">Bitcoin</SelectItem>
        </LabeledSelect>
        <LabeledSelect
          label="Location"
          placeholder="Select location"
          className="max-w-xs"
          defaultValue="any"
        >
          <SelectItem value="any">Any Category</SelectItem>
          <SelectItem value="1">Credit Card</SelectItem>
          <SelectItem value="2">Google Pay</SelectItem>
          <SelectItem value="3">PayPal</SelectItem>
          <SelectItem value="4">Bitcoin</SelectItem>
        </LabeledSelect>
        <LabeledSelect
          label="Price"
          placeholder="Select price range"
          className="max-w-xs"
          defaultValue="any"
        >
          <SelectItem value="any">Any Category</SelectItem>
          <SelectItem value="1">Credit Card</SelectItem>
          <SelectItem value="2">Google Pay</SelectItem>
          <SelectItem value="3">PayPal</SelectItem>
          <SelectItem value="4">Bitcoin</SelectItem>
        </LabeledSelect>
        <LabeledSelect
          label="I need photos by"
          placeholder="Select delivery duration"
          className="max-w-xs"
          defaultValue="any"
        >
          <SelectItem value="any">Any Category</SelectItem>
          <SelectItem value="1">Credit Card</SelectItem>
          <SelectItem value="2">Google Pay</SelectItem>
          <SelectItem value="3">PayPal</SelectItem>
          <SelectItem value="4">Bitcoin</SelectItem>
        </LabeledSelect>
      </div>
      <div className="flex flex-row gap-4 items-start md:items-center pb-8">
        <div className="flex flex-wrap gap-2 items-center border-r pr-6">
          <CountSelect
            label="Languages"
            values={[]}
            options={[
              { value: 'english', label: 'English' },
              { value: 'spanish', label: 'Spanish' },
              { value: 'french', label: 'French' },
            ]}
          />
          <CountSelect
            label="Experience"
            values={[]}
            options={[
              { value: '1', label: '1 year' },
              { value: '2', label: '2 years' },
              { value: '3', label: '3 years' },
            ]}
          />
          <CountSelect
            label="Rating"
            values={[]}
            options={[
              { value: '1', label: '1 star' },
              { value: '2', label: '2 stars' },
              { value: '3', label: '3 stars' },
            ]}
          />
        </div>
        <div className="flex flex-row justify-between items-center flex-1">
          <Select defaultValue="Low to High">
            <SelectTrigger className="border-none shadow-none">
              <span>
                <span className="text-muted-foreground text-xs">Sort by:</span>{' '}
                <SelectValue placeholder="Sort by" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low to High">Price: Low to High</SelectItem>
              <SelectItem value="High to Low<">Price: High to Low</SelectItem>
              <SelectItem value="Highest">Rating: Highest</SelectItem>
              <SelectItem value="Lowest">Rating: Lowest</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search by name"
            className="max-w-xs ml-auto shadow-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
