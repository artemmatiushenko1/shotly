ALTER TABLE "user" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "website_url" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "instagram_tag" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "cover_image_url" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "years_of_experience" integer;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");