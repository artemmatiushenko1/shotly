import { LocationDetails } from '@/entities/models/locations';
import { SortOption } from '@/studio/portfolio/use-cases/see-collections/use-collection-filter.hook';

import { DeliveryTime, PriceRange, RatingOption } from './enums';

type SearchParams = {
  sort: SortOption;
  priceRange: PriceRange;
  deliveryTime: DeliveryTime;
  languageCodes: string[];
  experienceYears: number;
  rating: RatingOption;
  search: string;
  categoryId: string;
  location: LocationDetails;
};

export const searchPhotographersUseCase = async (
  searchParams: SearchParams,
) => {
  console.log(searchParams);
};
