ALTER TABLE "orders" ADD COLUMN "display_id" text;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_display_id_unique" UNIQUE("display_id");