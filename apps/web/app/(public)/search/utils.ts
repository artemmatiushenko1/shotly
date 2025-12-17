import { SearchParams, searchParamsSchema } from '@/entities/models/search';

export function serializeParams(params: SearchParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.set('search', params.search);
  if (params.categoryId && params.categoryId !== 'any') {
    searchParams.set('categoryId', params.categoryId);
  }
  if (params.location) {
    // Store complex location object as a string, or preferably just the ID if possible
    searchParams.set('location', JSON.stringify(params.location));
  }
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.priceRange) {
    searchParams.set('priceRange', params.priceRange);
  }
  if (params.deliveryTime) {
    searchParams.set('deliveryTime', params.deliveryTime);
  }

  // Handle Arrays
  if (params.languageCodes?.length) {
    searchParams.set('languageCodes', params.languageCodes.join(','));
  }
  if (params.rating?.length) {
    searchParams.set('rating', params.rating.join(','));
  }
  if (params.experienceYears?.length) {
    searchParams.set('experienceYears', params.experienceYears.join(','));
  }

  return searchParams;
}

export function parseSearchParams(
  urlParams: URLSearchParams,
  defaultParams: SearchParams,
): SearchParams {
  const locationStr = urlParams.get('location');
  let parsedLocation = null;
  try {
    parsedLocation = locationStr ? JSON.parse(locationStr) : null;
  } catch (_) {
    // Fallback if JSON is invalid
  }

  return searchParamsSchema.parse({
    ...defaultParams,
    search: urlParams.get('search') || defaultParams.search,
    categoryId: urlParams.get('categoryId') || defaultParams.categoryId,
    location: parsedLocation || defaultParams.location,
    sort: urlParams.get('sort') || defaultParams.sort,
    priceRange: urlParams.get('priceRange') || defaultParams.priceRange,
    deliveryTime: urlParams.get('deliveryTime') || defaultParams.deliveryTime,
    languageCodes: urlParams.get('languageCodes')
      ? urlParams.get('languageCodes')!.split(',')
      : defaultParams.languageCodes,
    rating: urlParams.get('rating')
      ? urlParams.get('rating')!.split(',')
      : defaultParams.rating,
    experienceYears: urlParams.get('experienceYears')
      ? urlParams.get('experienceYears')!.split(',').map(Number)
      : defaultParams.experienceYears,
  });
}
