export enum SortOption {
  PRICE_LOW_TO_HIGH = 'priceLowToHigh',
  PRICE_HIGH_TO_LOW = 'priceHighToLow',
  RATING_HIGHEST = 'ratingHighest',
  RATING_LOWEST = 'ratingLowest',
}

export enum PriceRange {
  UNDER_1000 = 'under1000',
  BETWEEN_1000_AND_3000 = '1000to3000',
  BETWEEN_3000_AND_5000 = '3000to5000',
  BETWEEN_5000_AND_10000 = '5000to10000',
  BETWEEN_10000_AND_20000 = '10000to20000',
  OVER_20000 = 'over20000',
}

export enum DeliveryTime {
  UNDER_1_DAY = 'under1Day',
  UNDER_WEEK = 'underWeek',
  UNDER_MONTH = 'underMonth',
}

export enum RatingOption {
  ONE_STAR = 'oneStar',
  TWO_STARS = 'twoStars',
  THREE_STARS = 'threeStars',
  FOUR_STARS = 'fourStars',
  FIVE_STARS = 'fiveStars',
}
