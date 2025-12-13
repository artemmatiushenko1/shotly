import { sql } from 'drizzle-orm';
import {
  AnyPgColumn,
  bigint,
  boolean,
  check,
  date,
  decimal,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { generateDefaultUsername } from '@/application/use-cases/account/utils';
import { VisibilityStatus } from '@/entities/models/common';
import { PhotoMetadata } from '@/entities/models/photo';
import { ApprovalStatus, Role } from '@/entities/models/user';

export const roleEnum = pgEnum('role', [
  Role.PHOTOGRAPHER,
  Role.CUSTOMER,
  Role.UNKNOWN,
]);

export const approvalStatusEnum = pgEnum('approval_status', [
  ApprovalStatus.NOT_SUBMITTED,
  ApprovalStatus.PENDING_REVIEW,
  ApprovalStatus.APPROVED,
  ApprovalStatus.REJECTED,
]);

export const usersTable = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  profileImageUrl: text('profile_image_url'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: roleEnum('role').notNull().default(Role.UNKNOWN),
  username: text('username')
    .unique()
    .notNull()
    .$defaultFn(() => generateDefaultUsername()),
  websiteUrl: text('website_url'),
  instagramTag: text('instagram_tag'),
  coverImageUrl: text('cover_image_url'),
  yearsOfExperience: integer('years_of_experience').default(0),
  storageUsageInBytes: bigint('storage_usage_in_bytes', { mode: 'number' })
    .notNull()
    .default(0),
  storageLimitInBytes: bigint('storage_limit_in_bytes', { mode: 'number' })
    .notNull()
    .default(5_368_709_120), // 5GB TODO: move to constants
  bio: text('bio'),
  aboutMe: text('about_me'),
  /**
   * Caches the photographer's overall average rating across all services.
   */
  averageRating: numeric('average_rating', { precision: 2, scale: 1 })
    .notNull()
    .default('0.0'),
  /**
   * Caches the photographer's total number of reviews.
   */
  totalReviews: integer('total_reviews').notNull().default(0),
  approvalStatus: approvalStatusEnum('approval_status')
    .notNull()
    .default(ApprovalStatus.NOT_SUBMITTED),
});

export const sessionsTable = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const accountsTable = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verificationsTable = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const collectionVisibilityStatusEnum = pgEnum(
  'collection_visibility_status',
  [VisibilityStatus.PUBLIC, VisibilityStatus.PRIVATE],
);

export const collectionsTable = pgTable(
  'collections',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    visibilityStatus: collectionVisibilityStatusEnum('visibility_status')
      .notNull()
      .default(VisibilityStatus.PRIVATE),
    shootDate: date('shoot_date', {
      mode: 'date',
    }).notNull(),
    coverPhotoId: uuid('cover_photo_id').references(
      (): AnyPgColumn => photosTable.id,
      {
        onDelete: 'set null',
      },
    ),
    photographerId: text('photographer_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categoriesTable.id, { onDelete: 'restrict' }),
    // TODO: use withTimezone: true
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    archivedAt: timestamp('archived_at'),
  },
  (table) => [
    // Ensures a collection name is unique per photographer.
    uniqueIndex('collection_photographer_name_idx').on(
      table.photographerId,
      table.name,
    ),
  ],
);

export const languagesTable = pgTable('languages', {
  code: text('code').primaryKey(), // ISO 639-1 code
  name: text('name').notNull(),
  flag: text('flag').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userLanguagesTable = pgTable('user_languages', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').references(() => usersTable.id),
  languageCode: text('language_code').references(() => languagesTable.code),
});

export const locationsTable = pgTable(
  'locations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    // An external ID from geocoding provider (e.g., OpenStreetMap ID)
    // This is useful for preventing duplicates and updating location data.
    externalId: varchar('external_id', { length: 256 }).notNull(),
    name: varchar('name', { length: 256 }).notNull(), // e.g., "Warsaw"
    country: varchar('country', { length: 256 }).notNull(), // e.g., "Poland"
    latitude: decimal('latitude', { precision: 9, scale: 6 }).notNull(),
    longitude: decimal('longitude', { precision: 9, scale: 6 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [unique('provider_id_idx').on(table.id, table.name)],
);

export const usersToLocationsTable = pgTable(
  'users_to_locations',
  {
    userId: text('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    locationId: uuid('location_id')
      .notNull()
      .references(() => locationsTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    // This composite primary key ensures a user can't save the same location twice.
    primaryKey({ columns: [table.userId, table.locationId] }),
    index('users_to_locations_user_idx').on(table.userId),
    index('users_to_locations_location_idx').on(table.locationId),
  ],
);

export const categoriesTable = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  // TODO: add one more column per interface locale (name_en, name_uk)
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const featuresTable = pgTable('features', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  photographerId: text('photographer_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const serviceVisibilityStatusEnum = pgEnum('service_visibility_status', [
  VisibilityStatus.PUBLIC,
  VisibilityStatus.PRIVATE,
]);

export const servicesTable = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  coverImageUrl: text('cover_image_url').notNull(),
  price: integer('price').notNull().default(0),
  /**
   * 3-letter ISO currency code (e.g., "UAH", "USD").
   */
  currency: text('currency').notNull().default('UAH'),
  /**
   * Time in whole days (e.g., 7, 14, 30)
   */
  deliveryTimeInDays: integer('delivery_time_in_days').notNull(),

  visibilityStatus: serviceVisibilityStatusEnum('visibility_status')
    .notNull()
    .default(VisibilityStatus.PRIVATE),

  photographerId: text('photographer_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categoriesTable.id, { onDelete: 'restrict' }),
  /**
   * Caches the average rating.
   * 'numeric' is used instead of 'float' to avoid rounding errors.
   * (precision: 2, scale: 1) allows for values like '4.8'.
   */
  averageRating: numeric('average_rating', { precision: 2, scale: 1 })
    .notNull()
    .default('0.0'),

  /**
   * Caches the total number of reviews.
   */
  totalReviews: integer('total_reviews').notNull().default(0),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
  archivedAt: timestamp('archived_at'),
});

export const servicesToFeaturesTable = pgTable(
  'services_to_features',
  {
    serviceId: uuid('service_id')
      .notNull()
      .references(() => servicesTable.id, { onDelete: 'cascade' }),
    featureId: uuid('feature_id')
      .notNull()
      .references(() => featuresTable.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.serviceId, table.featureId] })],
);

export const photosTable = pgTable('photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  storageKey: text('storage_key').notNull().unique(),
  url: text('url').notNull(),
  sizeInBytes: bigint('size_in_bytes', { mode: 'number' }).notNull(),
  originalFilename: text('original_filename'),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  format: text('format').notNull(),
  metadata: jsonb('metadata').$type<PhotoMetadata>().notNull(),
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collectionsTable.id, { onDelete: 'cascade' }),
  // TODO: we don't need this column anymore
  photographerId: text('photographer_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// TODO: fix order status enum
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'paid',
  'delivered',
  'cancelled',
  'refunded',
]);

/**
 * Orders (for a Service)
 * Snapshots price and includes booking times.
 */
export const ordersTable = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Price Snapshot
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),

  status: orderStatusEnum('status').notNull().default('pending'),

  // Booking
  bookingStart: timestamp('booking_start', { withTimezone: true }),
  bookingEnd: timestamp('booking_end', { withTimezone: true }),

  buyerEmail: text('buyer_email').notNull(),

  serviceId: uuid('service_id')
    .notNull()
    .references(() => servicesTable.id, { onDelete: 'restrict' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const reviewsTable = pgTable(
  'reviews',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    rating: integer('rating').notNull(),
    comment: text('comment').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => ordersTable.id, { onDelete: 'cascade' })
      .unique(),
    buyerId: text('buyer_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'set null' }),
    serviceId: uuid('service_id')
      .notNull()
      .references(() => servicesTable.id, { onDelete: 'cascade' }),
    photographerId: text('photographer_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    check('rating_check', sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
  ],
);

export const schema = {
  usersTable,
  accountsTable,
  verificationsTable,
  sessionsTable,
  collectionsTable,
  categoriesTable,
  featuresTable,
};
