import { useMemo, useState } from 'react';

import { Collection } from '@/entities/models/collection';
import { VisibilityStatus } from '@/entities/models/common';

export type CollectionFilterTab = 'All' | 'Public' | 'Private';

export const COLLECTION_FILTER_TABS: CollectionFilterTab[] = [
  'All',
  'Public',
  'Private',
];

export type SortOption = 'shootDateNewest' | 'shootDateOldest' | 'lastModified';

export const SORT_OPTIONS: SortOption[] = [
  'shootDateNewest',
  'shootDateOldest',
  'lastModified',
];

const filterByStatus = (
  collections: Collection[],
  status: VisibilityStatus | null,
) => {
  if (!status) return collections;
  return collections.filter(
    (collection) => collection.visibilityStatus === status,
  );
};

const searchCollections = (collections: Collection[], query: string) => {
  if (!query.trim()) return collections;
  const lowerQuery = query.toLowerCase();
  return collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(lowerQuery) ||
      collection.description?.toLowerCase().includes(lowerQuery),
  );
};

const filterByCategory = (
  collections: Collection[],
  categoryId: string | null,
) => {
  if (!categoryId) return collections;
  return collections.filter(
    (collection) => collection.categoryId === categoryId,
  );
};

const sortCollections = (collections: Collection[], sortOption: SortOption) => {
  const sorted = [...collections];

  switch (sortOption) {
    case 'shootDateNewest':
      return sorted.sort(
        (a, b) => b.shootDate.getTime() - a.shootDate.getTime(),
      );
    case 'shootDateOldest':
      return sorted.sort(
        (a, b) => a.shootDate.getTime() - b.shootDate.getTime(),
      );
    case 'lastModified':
      // Sort by updatedAt if available, otherwise by createdAt, fallback to shootDate
      return sorted.sort((a, b) => {
        const aTime =
          a.updatedAt?.getTime() ??
          a.createdAt?.getTime() ??
          a.shootDate.getTime();
        const bTime =
          b.updatedAt?.getTime() ??
          b.createdAt?.getTime() ??
          b.shootDate.getTime();
        return bTime - aTime;
      });
    default:
      return sorted;
  }
};

export function useCollectionFilter(
  collections: Collection[],
  categories: { id: string; name: string }[],
) {
  const [selectedTab, setSelectedTab] = useState<CollectionFilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('shootDateNewest');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const counts = useMemo(
    () => ({
      All: collections.length,
      Public: filterByStatus(collections, VisibilityStatus.PUBLIC).length,
      Private: filterByStatus(collections, VisibilityStatus.PRIVATE).length,
    }),
    [collections],
  );

  const filteredCollections = useMemo(() => {
    let result = collections;

    // Filter by status
    if (selectedTab === 'All') {
      result = collections;
    } else {
      const statusMap: Record<CollectionFilterTab, VisibilityStatus | null> = {
        All: null,
        Public: VisibilityStatus.PUBLIC,
        Private: VisibilityStatus.PRIVATE,
      };
      result = filterByStatus(result, statusMap[selectedTab]);
    }

    // Filter by category
    result = filterByCategory(result, selectedCategoryId);

    // Search
    result = searchCollections(result, searchQuery);

    // Sort
    result = sortCollections(result, sortOption);

    return result;
  }, [collections, selectedTab, selectedCategoryId, searchQuery, sortOption]);

  return {
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
    tabs: COLLECTION_FILTER_TABS,
    categories,
  };
}
