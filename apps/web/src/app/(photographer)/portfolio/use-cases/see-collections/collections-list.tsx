'use client';

import { CollectionsToolbar } from './collections-toolbar';
import { CollectionsGrid } from './collections-grid';
import { useCollectionFilter } from './use-collection-filter';
import { Collection } from '@/domain/collection';
import { Category } from '@/domain/category';
import Empty from './empty';
import { useTranslations } from 'next-intl';
import { startTransition } from 'react';

type CollectionsListProps = {
  collections: Collection[];
  categories: Category[];
  collectionIdToPhotoCountMap: Record<string, number>;
  collectionIdToCoverPhotoUrlMap: Record<string, string>;
};

const CollectionsList = ({
  collections,
  categories,
  collectionIdToPhotoCountMap,
  collectionIdToCoverPhotoUrlMap,
}: CollectionsListProps) => {
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

  if (collections.length === 0) {
    return <Empty />;
  }

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
        <CollectionsGrid
          collections={filteredCollections}
          collectionIdToPhotoCountMap={collectionIdToPhotoCountMap}
          collectionIdToCoverPhotoUrlMap={collectionIdToCoverPhotoUrlMap}
        />
      )}
    </>
  );
};

export { CollectionsList };
