ALTER TABLE "photos" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "photos" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."photo_upload_status";--> statement-breakpoint
CREATE TYPE "public"."photo_upload_status" AS ENUM('pending', 'completed');--> statement-breakpoint
ALTER TABLE "photos" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."photo_upload_status";--> statement-breakpoint
ALTER TABLE "photos" ALTER COLUMN "status" SET DATA TYPE "public"."photo_upload_status" USING "status"::"public"."photo_upload_status";