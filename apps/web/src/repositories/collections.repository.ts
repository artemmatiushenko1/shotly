import { db } from '@/db/drizzle';
import { collectionsTable } from '@/db/schema';
import {
  CreateCollectionInput,
  Collection,
  collectionSchema,
} from '@/domain/collection';

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
    });
  }
}

const collectionsRepository = new CollectionsRepository();

export default collectionsRepository;
