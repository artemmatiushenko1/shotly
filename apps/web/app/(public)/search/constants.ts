import {
  DeliveryTime,
  PriceRange,
  SearchParams,
  SortOption,
} from '@/entities/models/search';

export const INITIAL_SEARCH_PARAMS: SearchParams = {
  sort: SortOption.PRICE_LOW_TO_HIGH,
  priceRange: PriceRange.UNSPECIFIED,
  deliveryTime: DeliveryTime.UNSPECIFIED,
  languageCodes: [],
  experienceYears: [],
  rating: [],
  search: '',
  categoryId: '',
  location: null,
};
