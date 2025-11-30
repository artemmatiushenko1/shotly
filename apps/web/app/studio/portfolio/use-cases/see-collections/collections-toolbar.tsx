'use client';

import { Badge } from '@shotly/ui/components/badge';
import { Input } from '@shotly/ui/components/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import { SearchIcon } from 'lucide-react';
import {
  CollectionFilterTab,
  SortOption,
  COLLECTION_FILTER_TABS,
} from './use-collection-filter';
import { Category } from '@/domain/category';
import { useTranslations } from 'next-intl';

type CollectionsToolbarProps = {
  selectedTab: CollectionFilterTab;
  setSelectedTab: (tab: CollectionFilterTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  counts: Record<CollectionFilterTab, number>;
  categories: Category[];
};

const CollectionsToolbar = ({
  selectedTab,
  setSelectedTab,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  selectedCategoryId,
  setSelectedCategoryId,
  counts,
  categories,
}: CollectionsToolbarProps) => {
  const t = useTranslations('portfolio.toolbar');

  return (
    <div className="flex gap-4 p-4 py-0 items-center">
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as CollectionFilterTab)}
      >
        <TabsList className="my-4">
          {COLLECTION_FILTER_TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {t(`filters.${tab}`)}{' '}
              <Badge
                variant={tab === selectedTab ? 'default' : 'secondary'}
                className="h-5 min-w-5 rounded-full px-1 ml-1"
              >
                {counts[tab]}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex-1 max-w-[300px] ml-auto">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={t('search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <Select
        value={sortOption}
        onValueChange={(value) => setSortOption(value as SortOption)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value="shootDateNewest">
              {t('sort.options.shootDateNewest')}
            </SelectItem>
            <SelectItem value="shootDateOldest">
              {t('sort.options.shootDateOldest')}
            </SelectItem>
            <SelectItem value="lastModified">
              {t('sort.options.lastModified')}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={selectedCategoryId ?? 'all'}
        onValueChange={(value) =>
          setSelectedCategoryId(value === 'all' ? null : value)
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('category.all')}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { CollectionsToolbar };
