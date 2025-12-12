'use client';

import { useTranslations } from 'next-intl';
import { startTransition } from 'react';

import { Category } from '@/entities/models/category';
import { Collection } from '@/entities/models/collection';

import { CollectionsGrid } from './collections-grid';
import { CollectionsToolbar } from './collections-toolbar';
import { useCollectionFilter } from './use-collection-filter';

type CollectionsListProps = {
  collections: Collection[];
  categories: Category[];
};

const CollectionsList = ({ collections, categories }: CollectionsListProps) => {
  const t = useTranslations('portfolio.empty');
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
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">{t('noResults')}</p>
        </div>
      ) : (
        <CollectionsGrid collections={filteredCollections} />
      )}
    </>
  );
};

export { CollectionsList };
