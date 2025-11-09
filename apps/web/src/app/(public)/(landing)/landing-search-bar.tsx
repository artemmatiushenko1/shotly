'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { Button } from '@shotly/ui/components/button';
import { ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Category } from '@/domain/category';

type LandingSearchBarProps = {
  categories: Category[];
};

// Common Ukrainian cities
const UKRAINIAN_CITIES = [
  'Kyiv',
  'Lviv',
  'Odesa',
  'Kharkiv',
  'Dnipro',
  'Zaporizhzhia',
  'Ivano-Frankivsk',
  'Ternopil',
  'Chernivtsi',
  'Uzhhorod',
  'Vinnytsia',
  'Poltava',
];

const BUDGET_RANGES = [
  { label: 'Under 1,000 ₴', value: '0-1000' },
  { label: '1,000 - 3,000 ₴', value: '1000-3000' },
  { label: '3,000 - 5,000 ₴', value: '3000-5000' },
  { label: '5,000 - 10,000 ₴', value: '5000-10000' },
  { label: '10,000 - 20,000 ₴', value: '10000-20000' },
  { label: 'Over 20,000 ₴', value: '20000+' },
];

function LandingSearchBar({ categories }: LandingSearchBarProps) {
  const router = useRouter();
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (location) params.set('location', location);
    if (budget) params.set('budget', budget);

    const queryString = params.toString();
    router.push(`/photographers${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 h-[48px]">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="flex-1 bg-gray-50 border-gray-200 data-[size=default]:h-full rounded-full px-6">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="flex-1 bg-gray-50 border-gray-200 data-[size=default]:h-full rounded-full px-6">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {UKRAINIAN_CITIES.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={budget} onValueChange={setBudget}>
        <SelectTrigger className="flex-1 bg-gray-50 border-gray-200 data-[size=default]:h-full rounded-full px-6">
          <SelectValue placeholder="Your Budget" />
        </SelectTrigger>
        <SelectContent>
          {BUDGET_RANGES.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={handleSearch}
        className="h-12 w-full sm:w-auto bg-[linear-gradient(60deg,#ffd164,#f8b03d,#ee6b60,#d6487f,#a147c4,#4b63e4,#3cccc7)] text-white has-[>svg]:pl-8 sm:px-8 rounded-full"
        size="lg"
      >
        <span className="whitespace-nowrap">Search Photographers</span>
        <ChevronRightIcon className="size-5" />
      </Button>
    </div>
  );
}

export default LandingSearchBar;
