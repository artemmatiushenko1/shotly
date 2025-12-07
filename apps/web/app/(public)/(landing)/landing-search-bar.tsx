'use client';

import { ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Category } from '@/domain/category';

import { Button } from '@shotly/ui/components/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';

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

function LandingSearchBar({ categories }: LandingSearchBarProps) {
  const router = useRouter();
  const t = useTranslations('landing.search');
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (location) params.set('location', location);
    if (budget) params.set('budget', budget);

    const queryString = params.toString();
    router.push(`/search${queryString ? `?${queryString}` : ''}`);
  };

  const budgetRanges = [
    { label: t('budgetRanges.under1000'), value: '0-1000' },
    { label: t('budgetRanges.1000to3000'), value: '1000-3000' },
    { label: t('budgetRanges.3000to5000'), value: '3000-5000' },
    { label: t('budgetRanges.5000to10000'), value: '5000-10000' },
    { label: t('budgetRanges.10000to20000'), value: '10000-20000' },
    { label: t('budgetRanges.over20000'), value: '20000+' },
  ];

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
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="flex-1 bg-gray-50 border-gray-200 data-[size=default]:h-full rounded-full px-6">
          <SelectValue placeholder={t('location')} />
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
