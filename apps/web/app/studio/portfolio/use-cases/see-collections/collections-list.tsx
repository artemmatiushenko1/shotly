'use client';

import { startTransition } from 'react';

import { Category } from '@/entities/models/category';
import { Collection } from '@/entities/models/collection';

import { CollectionsGrid } from './collections-grid';
import { CollectionsToolbar } from './collections-toolbar';
import NoResults from './no-results';
import { useCollectionFilter } from './use-collection-filter.hook';

type CollectionsListProps = {
  collections: Collection[];
  categories: Category[];
};

const CollectionsList = ({ collections, categories }: CollectionsListProps) => {
  const {
    selectedTab,
    setSelectedTab,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    selectedCategoryId,
    setSelectedCategoryId,
    counts,
    filteredCollections,
    clearFilters,
  } = useCollectionFilter(collections, categories);

  return (
    <>
      <CollectionsToolbar
        selectedTab={selectedTab}
        setSelectedTab={(tab) => startTransition(() => setSelectedTab(tab))}
        searchQuery={searchQuery}
        setSearchQuery={(query) => startTransition(() => setSearchQuery(query))}
        sortOption={sortOption}
        setSortOption={(sortOption) =>
          startTransition(() => setSortOption(sortOption))
        }
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={(categoryId) =>
          startTransition(() => setSelectedCategoryId(categoryId))
        }
        counts={counts}
        categories={categories}
      />
      {filteredCollections.length === 0 ? (
        <div className="relative min-h-[calc(100vh-200px)]">
          <NoResults
            onClearFilters={clearFilters}
            className="p-4 pt-0 absolute inset-0 flex items-center justify-center"
          />
        </div>
      ) : (
        <CollectionsGrid collections={filteredCollections} />
      )}
    </>
  );
};

export { CollectionsList };
