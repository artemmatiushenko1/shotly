ALTER TABLE "reviews" DROP CONSTRAINT "reviews_buyer_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_service_id_services_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_photographer_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "buyer_id";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "service_id";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "photographer_id";