CREATE TYPE "public"."approval_status" AS ENUM('not_submitted', 'pending_review', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."collection_visibility_status" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'paid', 'delivered', 'cancelled', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('photographer', 'customer', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."service_visibility_status" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"cover_image_url" text,
	"visibility_status" "collection_visibility_status" DEFAULT 'private' NOT NULL,
	"shoot_date" date NOT NULL,
	"cover_photo_id" uuid,
	"photographer_id" text NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"archived_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"photographer_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"flag" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"external_id" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"country" varchar(256) NOT NULL,
	"latitude" numeric(9, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "provider_id_idx" UNIQUE("id","name")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" integer NOT NULL,
	"currency" text NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"booking_start" timestamp with time zone,
	"booking_end" timestamp with time zone,
	"buyer_email" text NOT NULL,
	"service_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storage_key" text NOT NULL,
	"url" text NOT NULL,
	"size_in_bytes" bigint NOT NULL,
	"original_filename" text,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"format" text NOT NULL,
	"metadata" jsonb NOT NULL,
	"collection_id" uuid NOT NULL,
	"photographer_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "photos_storage_key_unique" UNIQUE("storage_key")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rating" integer NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"order_id" uuid NOT NULL,
	"buyer_id" text NOT NULL,
	"service_id" uuid NOT NULL,
	"photographer_id" text NOT NULL,
	CONSTRAINT "reviews_order_id_unique" UNIQUE("order_id"),
	CONSTRAINT "rating_check" CHECK ("reviews"."rating" >= 1 AND "reviews"."rating" <= 5)
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"cover_image_url" text NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"currency" text DEFAULT 'UAH' NOT NULL,
	"delivery_time_in_days" integer NOT NULL,
	"visibility_status" "service_visibility_status" DEFAULT 'private' NOT NULL,
	"photographer_id" text NOT NULL,
	"category_id" uuid NOT NULL,
	"average_rating" numeric(2, 1) DEFAULT '0.0' NOT NULL,
	"total_reviews" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"archived_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "services_to_features" (
	"service_id" uuid NOT NULL,
	"feature_id" uuid NOT NULL,
	CONSTRAINT "services_to_features_service_id_feature_id_pk" PRIMARY KEY("service_id","feature_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user_languages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"language_code" text
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role" "role" DEFAULT 'unknown' NOT NULL,
	"username" text,
	"website_url" text,
	"instagram_tag" text,
	"cover_image_url" text,
	"years_of_experience" integer DEFAULT 0,
	"storage_usage_in_bytes" bigint DEFAULT 0 NOT NULL,
	"storage_limit_in_bytes" bigint DEFAULT 5368709120 NOT NULL,
	"bio" text,
	"average_rating" numeric(2, 1) DEFAULT '0.0' NOT NULL,
	"total_reviews" integer DEFAULT 0 NOT NULL,
	"approval_status" "approval_status" DEFAULT 'not_submitted' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "users_to_locations" (
	"user_id" text NOT NULL,
	"location_id" uuid NOT NULL,
	CONSTRAINT "users_to_locations_user_id_location_id_pk" PRIMARY KEY("user_id","location_id")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_cover_photo_id_photos_id_fk" FOREIGN KEY ("cover_photo_id") REFERENCES "public"."photos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_photographer_id_user_id_fk" FOREIGN KEY ("photographer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "features_photographer_id_user_id_fk" FOREIGN KEY ("photographer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_photographer_id_user_id_fk" FOREIGN KEY ("photographer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_buyer_id_user_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_photographer_id_user_id_fk" FOREIGN KEY ("photographer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_photographer_id_user_id_fk" FOREIGN KEY ("photographer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services_to_features" ADD CONSTRAINT "services_to_features_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services_to_features" ADD CONSTRAINT "services_to_features_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_languages" ADD CONSTRAINT "user_languages_language_code_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."languages"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_locations" ADD CONSTRAINT "users_to_locations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_locations" ADD CONSTRAINT "users_to_locations_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "collection_photographer_name_idx" ON "collections" USING btree ("photographer_id","name");--> statement-breakpoint
CREATE INDEX "users_to_locations_user_idx" ON "users_to_locations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_to_locations_location_idx" ON "users_to_locations" USING btree ("location_id");