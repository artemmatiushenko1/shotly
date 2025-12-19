ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."order_status";--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'paid', 'delivered', 'cancelled');--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."order_status";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE "public"."order_status" USING "status"::"public"."order_status";--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "hours" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "price_per_hour" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "shoot_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "client_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "amount";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "booking_start";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "booking_end";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "buyer_email";