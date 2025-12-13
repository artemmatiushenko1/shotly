import { count, eq, sql } from 'drizzle-orm';

import {
  Collection,
  collectionSchema,
  CreateCollectionInput,
} from '@/entities/models/collection';
import { VisibilityStatus } from '@/entities/models/common';
import { Photo, PhotoMetadata, photoSchema } from '@/entities/models/photos';

// TODO: make it possible to import from @/drizzle
import { db } from '../../../drizzle';
import { collectionsTable, photosTable } from '../../../drizzle/schema';

type CollectionRow = typeof collectionsTable.$inferSelect & {
  photosCount?: number;
  coverPhotoUrl?: string | null;
};

class CollectionsRepository {
  private parseCollection(collection: CollectionRow): Collection {
    return collectionSchema.parse({
      ...collection,
      photosCount: collection.photosCount ?? 0,
      shootDate: new Date(collection.shootDate),
      createdAt: collection.createdAt
        ? new Date(collection.createdAt)
        : undefined,
      updatedAt: collection.updatedAt
        ? new Date(collection.updatedAt)
        : undefined,
    });
  }

  async createCollection(
    userId: string,
    input: CreateCollectionInput,
  ): Promise<Collection | null> {
    const [collection] = await db
      .insert(collectionsTable)
      .values({
        name: input.name,
        description: input.description,
        shootDate: input.shootDate,
        photographerId: userId,
        categoryId: input.categoryId,
      })
      .returning();

    if (!collection) {
      return null;
    }

    return this.parseCollection({ ...collection, photosCount: 0 });
  }

  async getAllCollections(userId: string): Promise<Collection[]> {
    const photosCountSq = db
      .select({
        collectionId: photosTable.collectionId,
        count: count(photosTable.id).as('count'),
      })
      .from(photosTable)
      .groupBy(photosTable.collectionId)
      .as('photosCountSq');

    const collections = await db
      .select({
        id: collectionsTable.id,
        name: collectionsTable.name,
        description: collectionsTable.description,
        visibilityStatus: collectionsTable.visibilityStatus,
        shootDate: collectionsTable.shootDate,
        coverPhotoId: collectionsTable.coverPhotoId,
        createdAt: collectionsTable.createdAt,
        updatedAt: collectionsTable.updatedAt,
        photographerId: collectionsTable.photographerId,
        categoryId: collectionsTable.categoryId,
        archivedAt: collectionsTable.archivedAt,

        coverPhotoUrl: photosTable.url,

        photosCount: sql<number>`coalesce(${photosCountSq.count}, 0)`.mapWith(
          Number,
        ),
      })
      .from(collectionsTable)
      .leftJoin(photosTable, eq(collectionsTable.coverPhotoId, photosTable.id))
      .leftJoin(
        photosCountSq,
        eq(collectionsTable.id, photosCountSq.collectionId),
      )
      .where(eq(collectionsTable.photographerId, userId));

    return collections.map((collection) => this.parseCollection(collection));
  }

  async getCollectionById(id: string): Promise<Collection | null> {
    const [collection] = await db
      .select()
      .from(collectionsTable)
      .where(eq(collectionsTable.id, id));

    if (!collection) {
      return null;
    }

    return this.parseCollection(collection);
  }

  async updateCollectionVisibilityStatus(
    id: string,
    status: VisibilityStatus,
  ): Promise<void> {
    await db
      .update(collectionsTable)
      .set({ visibilityStatus: status })
      .where(eq(collectionsTable.id, id))
      .returning();
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
  ): Promise<void> {
    await db
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

  async getCollectionIdToCoverPhotoUrlMap(
    userId: string,
  ): Promise<Record<string, string>> {
    const coverPhotoUrls = await db
      .select({ collectionId: collectionsTable.id, url: photosTable.url })
      .from(collectionsTable)
      .innerJoin(photosTable, eq(collectionsTable.coverPhotoId, photosTable.id))
      .where(eq(collectionsTable.photographerId, userId));

    return Object.fromEntries(
      coverPhotoUrls.map(({ collectionId, url }) => [collectionId, url ?? '']),
    );
  }

  async updateCollectionCoverImage(
    collectionId: string,
    photoId: string,
  ): Promise<void> {
    await db
      .update(collectionsTable)
      .set({ coverPhotoId: photoId })
      .where(eq(collectionsTable.id, collectionId))
      .returning();
  }
}

const collectionsRepository = new CollectionsRepository();

export default collectionsRepository;
