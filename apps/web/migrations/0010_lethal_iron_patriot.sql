ALTER TABLE "photos" ALTER COLUMN "storage_key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "photos" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "photos" ADD COLUMN "thumbnail_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "photos" ADD COLUMN "thumbnail_key" text NOT NULL;