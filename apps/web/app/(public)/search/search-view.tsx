'use client';

import debounce from 'debounce';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState, useTransition } from 'react';

import { Category } from '@/entities/models/category';
import { Language } from '@/entities/models/language';
import {
  DeliveryTime,
  PriceRange,
  RatingOption,
  SearchParams,
  SortOption,
} from '@/entities/models/search';

import { searchPhotographersAction } from './actions';
import Filters from './filters';

type SearchViewProps = {
  categories: Category[];
  languages: Language[];
};

const INITIAL_PARAMS: SearchParams = {
  sort: SortOption.PRICE_LOW_TO_HIGH,
  priceRange: PriceRange.UNSPECIFIED,
  deliveryTime: DeliveryTime.UNSPECIFIED,
  languageCodes: [],
  experienceYears: null,
  rating: RatingOption.UNSPECIFIED,
  search: '',
  categoryId: '',
  location: null,
};

export default function SearchView({ categories, languages }: SearchViewProps) {
  const t = useTranslations('landing.searchPage');

  const [filters, setFilters] = useState<SearchParams>(INITIAL_PARAMS);
  const [results, setResults] = useState<object[]>([]);
  const [isPending, startTransition] = useTransition();

  const performSearch = useMemo(
    () =>
      debounce((currentFilters: SearchParams) => {
        startTransition(async () => {
          const response = await searchPhotographersAction(currentFilters);
          console.log({ response });
          if (response.status === 'success') {
            // setResults(response.data);
          }
        });
      }, 1000),
    [],
  );

  useEffect(() => {
    performSearch(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler for filter updates
  const handleFilterChange = (newValues: Partial<SearchParams>) => {
    const updated = { ...filters, ...newValues };
    setFilters(updated);
    performSearch(updated);
  };

  return (
    <>
      <Filters
        categories={categories}
        languages={languages}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-lg font-bold">
            {t('resultsCount', { count: results.length })}
          </p>
          {isPending && (
            <span className="text-sm text-muted-foreground animate-pulse">
              Updating...
            </span>
          )}
        </div>

        <div className="min-h-[300px] grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* {results.map((photographer) => (
            <PhotographerCard key={photographer.id} {...photographer} />
          ))} */}

          {!isPending && results.length === 0 && (
            <div className="col-span-2 text-center py-10 text-muted-foreground">
              No photographers found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
