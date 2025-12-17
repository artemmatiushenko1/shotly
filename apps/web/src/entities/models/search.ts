import z from 'zod';

import { locationDetailsSchema } from './locations';

export enum SortOption {
  UNSPECIFIED = '',
  PRICE_LOW_TO_HIGH = 'priceLowToHigh',
  PRICE_HIGH_TO_LOW = 'priceHighToLow',
  RATING_HIGHEST = 'ratingHighest',
  RATING_LOWEST = 'ratingLowest',
}

export enum PriceRange {
  UNSPECIFIED = '',
  UNDER_1000 = 'under1000',
  BETWEEN_1000_AND_3000 = '1000to3000',
  BETWEEN_3000_AND_5000 = '3000to5000',
  BETWEEN_5000_AND_10000 = '5000to10000',
  BETWEEN_10000_AND_20000 = '10000to20000',
  OVER_20000 = 'over20000',
}

export enum DeliveryTime {
  UNSPECIFIED = '',
  UNDER_1_DAY = 'under1Day',
  UNDER_WEEK = 'underWeek',
  UNDER_MONTH = 'underMonth',
}

export enum RatingOption {
  UNSPECIFIED = '',
  ONE_STAR = 'oneStar',
  TWO_STARS = 'twoStars',
  THREE_STARS = 'threeStars',
  FOUR_STARS = 'fourStars',
  FIVE_STARS = 'fiveStars',
}

export const searchParamsSchema = z.object({
  sort: z.enum(SortOption).default(SortOption.PRICE_LOW_TO_HIGH),
  priceRange: z.enum(PriceRange).default(PriceRange.UNSPECIFIED),
  deliveryTime: z.enum(DeliveryTime).default(DeliveryTime.UNSPECIFIED),
  languageCodes: z.array(z.string()).default([]),
  experienceYears: z.number().nullable().default(null),
  rating: z.enum(RatingOption).nullable().default(RatingOption.UNSPECIFIED),
  search: z.string().default(''),
  categoryId: z.string().default(''),
  location: locationDetailsSchema.nullable().default(null),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

export const photographerSearchResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  profileImageUrl: z.string().nullish(),
  locationName: z.string(),
  rating: z.string(),
  totalReviews: z.number(),
  yearsOfExperience: z.number(),
  startingPrice: z.number(),
  currency: z.string(),
  categoryName: z.string(),
  portfolioImages: z.array(z.string()),
});

export type PhotographerSearchResult = z.infer<
  typeof photographerSearchResultSchema
>;
