'use client';

import { CollectionsToolbar } from './collections-toolbar';
import { CollectionsGrid } from './collections-grid';
import { useCollectionFilter } from './use-collection-filter';
import { Collection } from '@/domain/collection';
import { Category } from '@/domain/category';
import Empty from './empty';
import { useTranslations } from 'next-intl';

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

  // Show empty state only if there are no collections at all
  if (collections.length === 0) {
    return <Empty />;
  }

  return (
    <>
      <CollectionsToolbar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
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
