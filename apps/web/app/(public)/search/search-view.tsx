'use client';

import debounce from 'debounce';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState, useTransition } from 'react';

import EmptyState from '@/_components/empty-state';
import { Category } from '@/entities/models/category';
import { Language } from '@/entities/models/language';
import {
  PhotographerSearchResult,
  SearchParams,
} from '@/entities/models/search';

import { Button } from '@shotly/ui/components/button';

import { searchPhotographersAction } from './actions';
import { INITIAL_SEARCH_PARAMS } from './constants';
import Filters from './filters';
import PhotographerCard from './photographer-card';

type SearchViewProps = {
  categories: Category[];
  languages: Language[];
  initialSearchResults: PhotographerSearchResult[];
};

export default function SearchView({
  categories,
  languages,
  initialSearchResults,
}: SearchViewProps) {
  const t = useTranslations('landing.searchPage');

  const [filters, setFilters] = useState<SearchParams>(INITIAL_SEARCH_PARAMS);
  const [results, setResults] =
    useState<PhotographerSearchResult[]>(initialSearchResults);
  const [isPending, startTransition] = useTransition();

  const performSearch = useMemo(
    () =>
      debounce((currentFilters: SearchParams) => {
        startTransition(async () => {
          const result = await searchPhotographersAction(currentFilters);
          if (result.status === 'success' && result.response) {
            setResults(result.response);
          }
        });
      }, 1000),
    [],
  );

  // Handler for filter updates
  const handleFilterChange = (newValues: Partial<SearchParams>) => {
    const updated = { ...filters, ...newValues };
    setFilters(updated);
    performSearch(updated);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_SEARCH_PARAMS);
    performSearch(INITIAL_SEARCH_PARAMS);
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

        {results.length > 0 && !isPending ? (
          <div className="min-h-[300px] grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((result) => (
              <PhotographerCard
                key={result.id}
                id={result.id}
                name={result.name}
                profileImageUrl={result.profileImageUrl}
                location={result.locationName}
                rating={result.rating}
                username={result.username}
                yearsOfExperience={result.yearsOfExperience}
                startingPrice={result.startingPrice}
                currency={result.currency}
                categoryName={result.categoryName}
                totalReviews={result.totalReviews}
                portfolioImages={result.portfolioImages}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-20"
            icon={SearchIcon}
            title={'No photographers found'}
            description={'Try adjusting your search criteria'}
            action={
              <Button variant="outline" onClick={handleClearFilters}>
                Clear filters
              </Button>
            }
          />
        )}
      </div>
    </>
  );
}
