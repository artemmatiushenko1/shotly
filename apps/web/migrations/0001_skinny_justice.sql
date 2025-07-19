CREATE TYPE "public"."view_status" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TABLE "collection" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"location" text,
	"category" text NOT NULL,
	"cover_url" text,
	"status" "view_status" NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
