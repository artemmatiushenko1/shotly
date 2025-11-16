import { db } from '@/db/drizzle';
import { collectionsTable, photosTable } from '@/db/schema';
import {
  CreateCollectionInput,
  Collection,
  collectionSchema,
} from '@/domain/collection';
import { VisibilityStatus } from '@/domain/common';
import { Photo, PhotoMetadata, photoSchema } from '@/domain/photos';
import { count, eq } from 'drizzle-orm';

class CollectionsRepository {
  async createCollection(
    userId: string,
    input: CreateCollectionInput,
  ): Promise<Collection> {
    // TODO: Format date as YYYY-MM-DD string for PostgreSQL date type
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

  async updateCollectionVisibilityStatus(
    id: string,
    status: VisibilityStatus,
  ): Promise<Collection> {
    const [collection] = await db
      .update(collectionsTable)
      .set({ visibilityStatus: status })
      .where(eq(collectionsTable.id, id))
      .returning();

    if (!collection) {
      // TODO: throw NotFoundError
      throw new Error('Collection not found.');
    }

    // TODO: extract to a helper function
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

  // TODO: create schema for input parameters
  async createPhoto(
    photographerId: string,
    collectionId: string,
    photoUrl: string,
    photoKey: string,
    photoSizeInBytes: number,
    photoOriginalFilename: string,
    photoWidth: number,
    photoHeight: number,
    photoFormat: string,
    photoMetadata: PhotoMetadata,
  ): Promise<Photo> {
    const [photo] = await db
      .insert(photosTable)
      .values({
        collectionId,
        photographerId,
        url: photoUrl,
        storageKey: photoKey,
        sizeInBytes: photoSizeInBytes,
        originalFilename: photoOriginalFilename,
        width: photoWidth,
        height: photoHeight,
        format: photoFormat,
        metadata: photoMetadata,
      })
      .returning();

    if (!photo) {
      throw new Error('Failed to create photo.');
    }

    return photoSchema.parse(photo);
  }

  async getPhotosByCollectionId(collectionId: string): Promise<Photo[]> {
    const photos = await db
      .select()
      .from(photosTable)
      .where(eq(photosTable.collectionId, collectionId));

    return photos.map((photo) => photoSchema.parse(photo));
  }

  async getPhotoCountByCollectionId(collectionId: string): Promise<number> {
    const [photoCount] = await db
      .select({ count: count() })
      .from(photosTable)
      .where(eq(photosTable.collectionId, collectionId));

    return photoCount?.count ?? 0;
  }

  async getCollectionIdToPhotoCountMap(): Promise<Record<string, number>> {
    const photoCounts = await db
      .select({ collectionId: photosTable.collectionId, count: count() })
      .from(photosTable)
      .groupBy(photosTable.collectionId);

    return Object.fromEntries(
      photoCounts.map(({ collectionId, count }) => [collectionId, count ?? 0]),
    );
  }
}

const collectionsRepository = new CollectionsRepository();

export default collectionsRepository;
