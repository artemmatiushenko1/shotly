CREATE TYPE "public"."collection_visibility_status" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TYPE "public"."service_visibility_status" AS ENUM('public', 'private');--> statement-breakpoint
ALTER TABLE "availability_rules" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "blocked_times" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "availability_rules" CASCADE;--> statement-breakpoint
DROP TABLE "blocked_times" CASCADE;--> statement-breakpoint
ALTER TABLE "collections" ALTER COLUMN "visibility_status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "collections" ALTER COLUMN "visibility_status" SET DATA TYPE "public"."collection_visibility_status" USING "visibility_status"::text::"public"."collection_visibility_status";--> statement-breakpoint
ALTER TABLE "collections" ALTER COLUMN "visibility_status" SET DEFAULT 'private';--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "visibility_status" "service_visibility_status" DEFAULT 'private' NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "archived_at" timestamp;--> statement-breakpoint
ALTER TABLE "services" DROP COLUMN "status";--> statement-breakpoint
DROP TYPE "public"."view_status";--> statement-breakpoint
DROP TYPE "public"."day_of_week";--> statement-breakpoint
DROP TYPE "public"."service_status";