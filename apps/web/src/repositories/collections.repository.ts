import { db } from '@/db/drizzle';
import { collectionsTable } from '@/db/schema';
import {
  CreateCollectionInput,
  Collection,
  collectionSchema,
} from '@/domain/collection';
import { eq } from 'drizzle-orm';

class CollectionsRepository {
  async createCollection(
    userId: string,
    input: CreateCollectionInput,
  ): Promise<Collection> {
    // Format date as YYYY-MM-DD string for PostgreSQL date type
    const shootDateString = input.shootDate.toISOString().split('T')[0];

    if (!shootDateString) {
      throw new Error('Wrong shoot date format.');
    }

    const [collection] = await db
      .insert(collectionsTable)
      .values({
        name: input.name,
        description: input.description,
        shootDate: shootDateString,
        photographerId: userId,
        categoryId: input.categoryId,
      })
      .returning();

    if (!collection) {
      throw new Error('Failed to create collection.');
    }

    return collectionSchema.parse({
      ...collection,
      shootDate: new Date(collection.shootDate),
      createdAt: collection.createdAt
        ? new Date(collection.createdAt)
        : undefined,
      updatedAt: collection.updatedAt
        ? new Date(collection.updatedAt)
        : undefined,
    });
  }

  async getAllCollections(userId: string): Promise<Collection[]> {
    const collections = await db
      .select()
      .from(collectionsTable)
      .where(eq(collectionsTable.photographerId, userId));

    return collections.map((collection) =>
      collectionSchema.parse({
        ...collection,
        shootDate: new Date(collection.shootDate),
        createdAt: collection.createdAt
          ? new Date(collection.createdAt)
          : undefined,
        updatedAt: collection.updatedAt
          ? new Date(collection.updatedAt)
          : undefined,
      }),
    );
  }

  async getCollectionById(id: string): Promise<Collection> {
    const [collection] = await db
      .select()
      .from(collectionsTable)
      .where(eq(collectionsTable.id, id));

    if (!collection) {
      // TODO: throw NotFoundError
      throw new Error('Collection not found.');
    }

    return collectionSchema.parse({
      ...collection,
      shootDate: new Date(collection.shootDate),
      createdAt: collection.createdAt
        ? new Date(collection.createdAt)
        : undefined,
      updatedAt: collection.updatedAt
        ? new Date(collection.updatedAt)
        : undefined,
    });
  }
}

const collectionsRepository = new CollectionsRepository();

export default collectionsRepository;
