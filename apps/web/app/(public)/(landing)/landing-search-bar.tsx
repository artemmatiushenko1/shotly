'use client';

import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import LocationSearch from '@/_components/location-search/location-search';
import { Category } from '@/entities/models/category';
import { LocationDetails } from '@/entities/models/locations';
import { PriceRange, searchParamsSchema } from '@/entities/models/search';

import { Button } from '@shotly/ui/components/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';

import { serializeParams } from '../search/utils';

type LandingSearchBarProps = {
  categories: Category[];
};

function LandingSearchBar({ categories }: LandingSearchBarProps) {
  const router = useRouter();

  const t = useTranslations('landing.search');
  const tBudgetRanges = useTranslations('landing.search.budgetRanges');

  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<LocationDetails | null>(null);
  const [budget, setBudget] = useState<string>('');

  const handleSearch = () => {
    const queryString = serializeParams(
      searchParamsSchema.parse({
        categoryId: category,
        location: location,
        priceRange: budget,
      }),
    ).toString();

    router.push(`/search${queryString ? `?${queryString}` : ''}`);
  };

  const budgetRanges = [
    { label: tBudgetRanges('under1000'), value: PriceRange.UNDER_1000 },
    {
      label: tBudgetRanges('1000to3000'),
      value: PriceRange.BETWEEN_1000_AND_3000,
    },
    {
      label: tBudgetRanges('3000to5000'),
      value: PriceRange.BETWEEN_3000_AND_5000,
    },
    {
      label: tBudgetRanges('5000to10000'),
      value: PriceRange.BETWEEN_5000_AND_10000,
    },
    {
      label: tBudgetRanges('10000to20000'),
      value: PriceRange.BETWEEN_10000_AND_20000,
    },
    { label: tBudgetRanges('over20000'), value: PriceRange.OVER_20000 },
  ];

  const handleLocationChange = (location: LocationDetails) => {
    setLocation(location);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 h-[48px]">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="flex-1 bg-gray-50 border-gray-200 data-[size=default]:h-full rounded-full px-6">
          <SelectValue placeholder={t('category')} />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <LocationSearch
        value={[location].filter(Boolean) as LocationDetails[]}
        onChange={handleLocationChange}
        trigger={
          <button
            data-placeholder={!location ? true : undefined}
            className="font-normal data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 border py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 flex-1 bg-gray-50 border-gray-200 data-[size=default]:h-full rounded-full px-6 h-full"
          >
            {<span>{location?.name ?? t('location')}</span>}
            <ChevronDownIcon className="size-4 text-muted-foreground opacity-50" />
          </button>
        }
      />

      <Select value={budget} onValueChange={setBudget}>
        <SelectTrigger className="flex-1 bg-gray-50 border-gray-200 data-[size=default]:h-full rounded-full px-6">
          <SelectValue placeholder={t('budget')} />
        </SelectTrigger>
        <SelectContent>
          {budgetRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={handleSearch}
        className="h-12 w-full sm:w-auto has-[>svg]:pl-8 sm:px-8 rounded-full"
        size="lg"
      >
        <span className="whitespace-nowrap">{t('searchButton')}</span>
        <ChevronRightIcon className="size-5" />
      </Button>
    </div>
  );
}

export default LandingSearchBar;
