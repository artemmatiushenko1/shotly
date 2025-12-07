import 'server-only';
import { eq, inArray, sql } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import {
  languagesTable,
  locationsTable,
  userLanguagesTable,
  usersTable,
  usersToLocationsTable,
} from '@/db/schema';
import { LocationDetails } from '@/domain/locations';
import {
  ApprovalStatus,
  Role,
  StorageUsage,
  storageUsageSchema,
  User,
  UserProfile,
  userProfileSchema,
  userSchema,
  UserUpdate,
} from '@/domain/user';

class UsersRepository {
  async updateUserLanguages(userId: string, languageCodes: string[]) {
    const newLanguageRows = await db
      .select({ code: languagesTable.code })
      .from(languagesTable)
      .where(inArray(languagesTable.code, languageCodes));

    const newLanguageCodes = newLanguageRows.map((l) => l.code);

    await db
      .delete(userLanguagesTable)
      .where(eq(userLanguagesTable.userId, userId));

    if (newLanguageCodes.length > 0) {
      await db.insert(userLanguagesTable).values(
        newLanguageCodes.map((code) => ({
          userId,
          languageCode: code,
        })),
      );
    }
  }

  async updateUserLocations(userId: string, locations: LocationDetails[]) {
    // Get all location IDs, creating locations if they don't exist
    const locationIds: string[] = [];

    for (const location of locations) {
      // Check if location with this externalId already exists
      const existingLocation = await db
        .select({ id: locationsTable.id })
        .from(locationsTable)
        .where(eq(locationsTable.externalId, location.externalId))
        .limit(1);

      let locationId: string;

      if (existingLocation.length > 0 && existingLocation[0]) {
        locationId = existingLocation[0].id;
      } else {
        // Insert new location
        const [newLocation] = await db
          .insert(locationsTable)
          .values({
            externalId: location.externalId,
            name: location.name,
            country: location.country,
            latitude: location.lat,
            longitude: location.lon,
          })
          .returning({ id: locationsTable.id });

        if (!newLocation) {
          return null;
        }

        locationId = newLocation.id;
      }

      locationIds.push(locationId);
    }

    // Delete all existing user-location relationships
    await db
      .delete(usersToLocationsTable)
      .where(eq(usersToLocationsTable.userId, userId));

    // Insert new user-location relationships
    if (locationIds.length > 0) {
      await db.insert(usersToLocationsTable).values(
        locationIds.map((locationId) => ({
          userId,
          locationId,
        })),
      );
    }
  }

  async updateUser(id: string, input: Partial<UserUpdate>): Promise<User> {
    const [query] = await db
      .update(usersTable)
      .set(input)
      .where(eq(usersTable.id, id))
      .returning();

    return userSchema.parse(query);
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    const [userQuery] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    const languagesQuery = await db
      .select({
        code: languagesTable.code,
        name: languagesTable.name,
        flag: languagesTable.flag,
      })
      .from(userLanguagesTable)
      .innerJoin(
        languagesTable,
        eq(userLanguagesTable.languageCode, languagesTable.code),
      )
      .where(eq(userLanguagesTable.userId, userId));

    const locationsQuery = await db
      .select({
        externalId: locationsTable.externalId,
        name: locationsTable.name,
        country: locationsTable.country,
        latitude: locationsTable.latitude,
        longitude: locationsTable.longitude,
      })
      .from(usersToLocationsTable)
      .innerJoin(
        locationsTable,
        eq(usersToLocationsTable.locationId, locationsTable.id),
      )
      .where(eq(usersToLocationsTable.userId, userId));

    return userProfileSchema.parse({
      ...userQuery,
      languages: languagesQuery,
      locations: locationsQuery.map((location) => ({
        externalId: location.externalId,
        name: location.name,
        country: location.country,
        lat: location.latitude,
        lon: location.longitude,
        displayName: `${location.name}, ${location.country}`,
      })),
    });
  }

  async getStorageUsage(userId: string): Promise<StorageUsage> {
    const [query] = await db
      .select({
        storageUsage: usersTable.storageUsageInBytes,
        storageLimit: usersTable.storageLimitInBytes,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    return storageUsageSchema.parse(query);
  }

  async updateStorageUsage(userId: string, addedBytes: number) {
    await db
      .update(usersTable)
      .set({
        storageUsageInBytes: sql`${usersTable.storageUsageInBytes} + ${addedBytes}`,
      })
      .where(eq(usersTable.id, userId))
      .returning();
  }

  async updateUserRole(userId: string, role: Role) {
    await db
      .update(usersTable)
      .set({ role })
      .where(eq(usersTable.id, userId))
      .returning();
  }

  async changeApprovalStatus(userId: string, status: ApprovalStatus) {
    await db
      .update(usersTable)
      .set({ approvalStatus: status })
      .where(eq(usersTable.id, userId))
      .returning();
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
