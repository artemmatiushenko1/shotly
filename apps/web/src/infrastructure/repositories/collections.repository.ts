import { and, count, eq, sql } from 'drizzle-orm';

import {
  Collection,
  collectionSchema,
  CreateCollectionInput,
  UpdateCollectionInput,
} from '@/entities/models/collection';
import { VisibilityStatus } from '@/entities/models/common';
import {
  CreatePhotoInput,
  Photo,
  photoSchema,
  PhotoUploadStatus,
} from '@/entities/models/photo';

// TODO: make it possible to import from @/drizzle
import { db } from '../../../drizzle';
import {
  categoriesTable,
  collectionsTable,
  photosTable,
} from '../../../drizzle/schema';

type CollectionRow = typeof collectionsTable.$inferSelect & {
  photosCount?: number;
  coverPhotoUrl?: string | null;
  categoryName: string;
  categoryNameUk: string;
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
      category: {
        id: collection.categoryId,
        name: collection.categoryName,
        nameUk: collection.categoryNameUk,
      },
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

    return this.getCollectionById(collection.id);
  }

  private getCollectionsBaseQuery() {
    const photosCountSq = db
      .select({
        collectionId: photosTable.collectionId,
        count: count(photosTable.id).as('count'),
      })
      .from(photosTable)
      .groupBy(photosTable.collectionId)
      .as('photosCountSq');

    return db
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
        coverPhotoUrl: photosTable.thumbnailUrl,
        categoryName: categoriesTable.name,
        categoryNameUk: categoriesTable.nameUk,
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
      .innerJoin(
        categoriesTable,
        eq(collectionsTable.categoryId, categoriesTable.id),
      );
  }

  async getAllCollections(
    userId: string,
    visibilityStatus?: VisibilityStatus,
  ): Promise<Collection[]> {
    const collections = await this.getCollectionsBaseQuery().where(
      and(
        eq(collectionsTable.photographerId, userId),
        visibilityStatus
          ? eq(collectionsTable.visibilityStatus, visibilityStatus)
          : undefined,
      ),
    );

    return collections.map((collection) => this.parseCollection(collection));
  }

  async getCollectionById(id: string): Promise<Collection | null> {
    const [collection] = await this.getCollectionsBaseQuery().where(
      eq(collectionsTable.id, id),
    );

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

  async createPhoto(
    photographerId: string,
    collectionId: string,
    input: CreatePhotoInput,
  ): Promise<Photo | null> {
    const [photo] = await db
      .insert(photosTable)
      .values({
        collectionId,
        photographerId,
        sizeInBytes: input.sizeInBytes,
        originalFilename: input.originalFilename,
        width: input.width,
        height: input.height,
        format: input.format,
        metadata: input.metadata,
        url: input.url,
        storageKey: input.storageKey,
        thumbnailUrl: input.thumbnailUrl,
        thumbnailKey: input.thumbnailKey,
      })
      .returning();

    if (!photo) {
      return null;
    }

    return photoSchema.parse(photo);
  }

  async getPhotosByCollectionId(
    collectionId: string,
    status?: PhotoUploadStatus,
  ): Promise<Photo[]> {
    const whereClause = status
      ? and(
          eq(photosTable.collectionId, collectionId),
          eq(photosTable.status, status),
        )
      : eq(photosTable.collectionId, collectionId);

    const photos = (
      await db.select().from(photosTable).where(whereClause)
    ).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return photos.map((photo) => photoSchema.parse(photo));
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

  async updateCollection(
    collectionId: string,
    input: UpdateCollectionInput,
  ): Promise<void> {
    await db
      .update(collectionsTable)
      .set(input)
      .where(eq(collectionsTable.id, collectionId))
      .returning();
  }

  async deleteCollection(collectionId: string): Promise<void> {
    await db
      .delete(collectionsTable)
      .where(eq(collectionsTable.id, collectionId))
      .returning();
  }

  async getPhotoById(photoId: string): Promise<Photo | null> {
    const [photo] = await db
      .select()
      .from(photosTable)
      .where(eq(photosTable.id, photoId));

    if (!photo) {
      return null;
    }

    return photoSchema.parse(photo);
  }

  async deletePhoto(photoId: string): Promise<void> {
    await db.delete(photosTable).where(eq(photosTable.id, photoId)).returning();
  }

  async updatePhotoStatus(
    photoId: string,
    status: PhotoUploadStatus,
  ): Promise<void> {
    await db
      .update(photosTable)
      .set({ status })
      .where(eq(photosTable.id, photoId))
      .returning();
  }
}

const collectionsRepository = new CollectionsRepository();

export default collectionsRepository;
