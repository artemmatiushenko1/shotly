import {
  and,
  asc,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  lte,
  SQL,
  sql,
} from 'drizzle-orm';

import { IPhotographerSearchService } from '@/application/services/photographer-search-service.interface';
import {
  photographerSearchResultSchema,
  PriceRange,
  RatingOption,
  SearchParams,
  SortOption,
} from '@/entities/models/search';
import { Role } from '@/entities/models/user';

import { db } from '../../../../drizzle';
import {
  categoriesTable,
  locationsTable,
  servicesTable,
  userLanguagesTable,
  usersTable,
  usersToLocationsTable,
} from '../../../../drizzle/schema';

export class PhotographerSearchService implements IPhotographerSearchService {
  async search(params: SearchParams) {
    const {
      search,
      categoryId,
      location,
      priceRange,
      languageCodes,
      experienceYears,
      rating,
      sort,
    } = params;

    console.log({ params });

    // 1. Base Filter (Only Photographers)
    const filters: SQL[] = [eq(usersTable.role, Role.PHOTOGRAPHER)];

    // 2. Handle Text Search
    if (search) {
      filters.push(
        sql`(${ilike(usersTable.name, `%${search}%`)} OR ${ilike(usersTable.username, `%${search}%`)})`,
      );
    }

    // 3. Handle Rating Enum -> Number
    const minRating = this.getMinRating(rating);
    if (minRating !== null) {
      // Cast input to numeric to prevent "operator does not exist" errors
      filters.push(sql`${usersTable.averageRating} >= ${minRating}::numeric`);
    }

    // 4. Handle Price Range Enum -> [Min, Max]
    const [minPrice, maxPrice] = this.getPriceBounds(priceRange);
    if (minPrice !== null) {
      filters.push(gte(servicesTable.price, minPrice));
    }
    if (maxPrice !== null) {
      filters.push(lte(servicesTable.price, maxPrice));
    }

    // 5. Handle Other Filters
    if (experienceYears !== null) {
      filters.push(gte(usersTable.yearsOfExperience, experienceYears));
    }

    if (location?.externalId) {
      filters.push(eq(locationsTable.externalId, location.externalId));
    }

    if (categoryId) {
      // Assuming you have joined categories or handle ID check
      filters.push(eq(categoriesTable.id, categoryId));
    }

    if (languageCodes.length > 0) {
      filters.push(inArray(userLanguagesTable.languageCode, languageCodes));
    }

    // 6. Build Query
    const query = db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        username: usersTable.username,
        profileImageUrl: usersTable.profileImageUrl,
        rating: usersTable.averageRating,
        totalReviews: usersTable.totalReviews,
        yearsOfExperience: usersTable.yearsOfExperience,
        locationName: sql<string>`MAX(${locationsTable.name})`,
        startingPrice: sql<number>`MIN(${servicesTable.price})`,
        currency: sql<string>`MAX(${servicesTable.currency})`,
        categoryName: sql<string>`MAX(${categoriesTable.name})`,
      })
      .from(usersTable)
      .innerJoin(
        usersToLocationsTable,
        eq(usersTable.id, usersToLocationsTable.userId),
      )
      .innerJoin(
        locationsTable,
        eq(usersToLocationsTable.locationId, locationsTable.id),
      )
      .innerJoin(servicesTable, eq(usersTable.id, servicesTable.photographerId))
      .innerJoin(
        categoriesTable,
        eq(servicesTable.categoryId, categoriesTable.id),
      )
      .innerJoin(
        userLanguagesTable,
        eq(usersTable.id, userLanguagesTable.userId),
      )
      .where(and(...filters))
      .groupBy(usersTable.id)
      .orderBy(this.getSortOrder(sort));

    const results = await query;

    return results.map((result) =>
      photographerSearchResultSchema.parse(result),
    );
  }

  // --- HELPER: Map Rating Strings to Numbers ---
  private getMinRating(option: RatingOption | null): number | null {
    switch (option) {
      case RatingOption.FIVE_STARS:
        return 5;
      case RatingOption.FOUR_STARS:
        return 4;
      case RatingOption.THREE_STARS:
        return 3;
      case RatingOption.TWO_STARS:
        return 2;
      case RatingOption.ONE_STAR:
        return 1;
      case RatingOption.UNSPECIFIED:
      case null:
      default:
        return null; // No filter
    }
  }

  // --- HELPER: Map Price Enum to Limits ---
  private getPriceBounds(range: PriceRange): [number | null, number | null] {
    switch (range) {
      case PriceRange.UNDER_1000:
        return [null, 1000];
      case PriceRange.BETWEEN_1000_AND_3000:
        return [1000, 3000];
      case PriceRange.BETWEEN_3000_AND_5000:
        return [3000, 5000];
      case PriceRange.BETWEEN_5000_AND_10000:
        return [5000, 10000];
      case PriceRange.BETWEEN_10000_AND_20000:
        return [10000, 20000];
      case PriceRange.OVER_20000:
        return [20000, null];
      case PriceRange.UNSPECIFIED:
      default:
        return [null, null];
    }
  }

  // --- HELPER: Sort Logic ---
  private getSortOrder(sort: SortOption): SQL {
    switch (sort) {
      case SortOption.PRICE_LOW_TO_HIGH:
        return sql`MIN(${servicesTable.price}) ASC`;
      case SortOption.PRICE_HIGH_TO_LOW:
        return sql`MIN(${servicesTable.price}) DESC`;
      case SortOption.RATING_HIGHEST:
        return desc(usersTable.averageRating);
      case SortOption.RATING_LOWEST:
        return asc(usersTable.averageRating);
      case SortOption.UNSPECIFIED:
      default:
        return desc(usersTable.createdAt);
    }
  }
}
