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

type CollectionRow = typeof collectionsTable.$inferSelect & {
  photosCount?: number;
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

    return this.parseCollection({ ...collection, photosCount: 0 });
  }

  async getAllCollections(userId: string): Promise<Collection[]> {
    const collections = await db
      .select({
        id: collectionsTable.id,
        name: collectionsTable.name,
        description: collectionsTable.description,
        coverImageUrl: collectionsTable.coverImageUrl,
        visibilityStatus: collectionsTable.visibilityStatus,
        shootDate: collectionsTable.shootDate,
        coverPhotoId: collectionsTable.coverPhotoId,
        createdAt: collectionsTable.createdAt,
        updatedAt: collectionsTable.updatedAt,
        photographerId: collectionsTable.photographerId,
        categoryId: collectionsTable.categoryId,
        archivedAt: collectionsTable.archivedAt,
        photosCount: count(photosTable.id).as('photos_count'),
      })
      .from(collectionsTable)
      .leftJoin(photosTable, eq(collectionsTable.id, photosTable.collectionId))
      .where(eq(collectionsTable.photographerId, userId))
      .groupBy(collectionsTable.id);

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

    return this.parseCollection(collection);
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

  async getCollectionIdToPhotoCountMap(
    userId: string,
  ): Promise<Record<string, number>> {
    const photoCounts = await db
      .select({ collectionId: photosTable.collectionId, count: count() })
      .from(photosTable)
      .where(eq(photosTable.photographerId, userId))
      .groupBy(photosTable.collectionId);

    return Object.fromEntries(
      photoCounts.map(({ collectionId, count }) => [collectionId, count ?? 0]),
    );
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
  ): Promise<Collection | null> {
    const [collection] = await db
      .update(collectionsTable)
      .set({ coverPhotoId: photoId })
      .where(eq(collectionsTable.id, collectionId))
      .returning();

    if (!collection) {
      return null;
    }

    return this.parseCollection(collection);
  }
}

const collectionsRepository = new CollectionsRepository();

export default collectionsRepository;
