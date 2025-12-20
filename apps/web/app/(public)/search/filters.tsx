// src/presentation/search/filters.tsx
'use client';

import { StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Use the inferred type from your Zod schema (or the manual type if preferred)
import { Category } from '@/entities/models/category';
import { Language } from '@/entities/models/language';
import { LocationDetails } from '@/entities/models/locations'; // Import LocationDetails
import {
  DeliveryTime,
  PriceRange,
  RatingOption,
  SearchParams,
  SortOption,
} from '@/entities/models/search';

import { Input } from '@shotly/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shotly/ui/components/select';

import CountSelect from './count-select';
import { LabeledSelect } from './labeled-select';
import LocationSelect from './location-select';

type FiltersProps = {
  categories: Category[];
  languages: Language[];
  filters: SearchParams;
  onFilterChange: (newFilters: Partial<SearchParams>) => void;
};

function Filters({
  categories,
  languages,
  filters,
  onFilterChange,
}: FiltersProps) {
  const t = useTranslations('landing.searchPage.filters');
  const tBudgetRanges = useTranslations('landing.search.budgetRanges');

  /**
   * Generic Type-Safe Handler
   * <K extends keyof SearchParams> ensures 'key' must be a valid property of SearchParams.
   * 'value' is then automatically restricted to the correct type for that specific key.
   */
  const handleChange = <K extends keyof SearchParams>(
    key: K,
    value: SearchParams[K],
  ) => {
    onFilterChange({ [key]: value });
  };

  const budgetRangesOptions = [
    { label: tBudgetRanges('under1000'), value: PriceRange.UNDER_1000 },
    {
      label: tBudgetRanges('1000to3000'),
      value: PriceRange.BETWEEN_1000_AND_3000,
    },
    {
      label: tBudgetRanges('3000to5000'),
      value: PriceRange.BETWEEN_3000_AND_5000,
    },
    {
      label: tBudgetRanges('5000to10000'),
      value: PriceRange.BETWEEN_5000_AND_10000,
    },
    {
      label: tBudgetRanges('10000to20000'),
      value: PriceRange.BETWEEN_10000_AND_20000,
    },
    { label: tBudgetRanges('over20000'), value: PriceRange.OVER_20000 },
  ];

  const getRatingOptions = () => {
    return [
      RatingOption.ONE_STAR,
      RatingOption.TWO_STARS,
      RatingOption.THREE_STARS,
      RatingOption.FOUR_STARS,
      RatingOption.FIVE_STARS,
    ].map((ratingOption, index) => {
      return {
        value: ratingOption,
        label: (
          <div className="flex items-center gap-1">
            {Array.from({ length: index + 1 }).map((_, starIndex) => (
              <StarIcon
                key={starIndex}
                className="size-4 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
        ),
      };
    });
  };

  return (
    <div className="sticky top-4 z-10 p-4 rounded-3xl bg-[linear-gradient(to_right,_#e8ebff_0%,_#fff4ea_100%)] border">
      <div className="mb-4 lg:grid lg:grid-cols-4 lg:gap-4">
        {/* Category */}
        <LabeledSelect
          label={t('category.label')}
          placeholder={t('category.placeholder')}
          className="max-w-xs"
          value={filters.categoryId}
          onValueChange={(val) => handleChange('categoryId', val)}
        >
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </LabeledSelect>

        {/* Location - Strictly typed callback */}
        <LocationSelect
          label={t('location.label')}
          className="max-w-xs"
          value={filters.location}
          onValueChange={(val: LocationDetails | null) =>
            handleChange('location', val)
          }
        />

        {/* Price */}
        <LabeledSelect
          className="max-w-xs"
          label={t('price.label')}
          placeholder={t('price.placeholder')}
          value={filters.priceRange}
          onValueChange={(val) => handleChange('priceRange', val as PriceRange)}
        >
          {budgetRangesOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </LabeledSelect>

        {/* Delivery Time */}
        <LabeledSelect
          label={t('delivery.label')}
          placeholder={t('delivery.placeholder')}
          className="max-w-xs"
          value={filters.deliveryTime}
          onValueChange={(val) =>
            handleChange('deliveryTime', val as DeliveryTime)
          }
        >
          <SelectItem value={DeliveryTime.UNDER_1_DAY}>Day</SelectItem>
          <SelectItem value={DeliveryTime.UNDER_WEEK}>Week</SelectItem>
          <SelectItem value={DeliveryTime.UNDER_MONTH}>Month</SelectItem>
        </LabeledSelect>
      </div>

      <div className="flex flex-row gap-4 items-start md:items-center">
        <div className="flex flex-wrap gap-2 items-center border-r border-muted pr-6">
          {/* Languages */}
          <CountSelect
            label={t('languages.label')}
            values={filters.languageCodes}
            onChange={(values: string[]) =>
              handleChange('languageCodes', values)
            }
            options={languages.map((language) => ({
              value: language.code,
              label: `${language.flag} ${language.name}`,
            }))}
          />

          {/* Experience */}
          <CountSelect
            label={t('experience.label')}
            values={filters.experienceYears.map(String)}
            onChange={(vals) =>
              handleChange('experienceYears', vals.map(Number))
            }
            options={Array.from({ length: 11 }, (_, i) => ({
              value: String(i),
              label: i === 10 ? '10+ years' : `${i} years`,
            }))}
          />

          {/* Rating */}
          <CountSelect
            label={t('rating.label')}
            values={filters.rating}
            onChange={(vals) => handleChange('rating', vals as RatingOption[])}
            options={getRatingOptions()}
          />
        </div>

        <div className="flex flex-row justify-between items-center flex-1">
          {/* Sort */}
          <Select
            value={filters.sort}
            onValueChange={(val) => handleChange('sort', val as SortOption)}
          >
            <SelectTrigger className="border-none shadow-none">
              <span>
                <span className="text-muted-foreground text-xs">
                  {t('sort.label')}
                </span>{' '}
                <SelectValue placeholder={t('sort.placeholder')}>
                  {t(`sort.${filters.sort}`)}
                </SelectValue>
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SortOption.PRICE_LOW_TO_HIGH}>
                {t('sort.priceLowToHigh')}
              </SelectItem>
              <SelectItem value={SortOption.PRICE_HIGH_TO_LOW}>
                {t('sort.priceHighToLow')}
              </SelectItem>
              <SelectItem value={SortOption.RATING_HIGHEST}>
                {t('sort.ratingHighest')}
              </SelectItem>
              <SelectItem value={SortOption.RATING_LOWEST}>
                {t('sort.ratingLowest')}
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Text Search */}
          <Input
            type="search"
            placeholder={t('searchByName')}
            className="max-w-xs ml-auto shadow-none bg-background"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
