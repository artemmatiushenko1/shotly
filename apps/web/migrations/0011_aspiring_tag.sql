CREATE TYPE "public"."service_status" AS ENUM('public', 'private', 'archived');--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"cover_image_url" text NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"currency" text DEFAULT 'UAH' NOT NULL,
	"delivery_time_in_days" integer NOT NULL,
	"status" "service_status" DEFAULT 'private' NOT NULL,
	"photographer_id" text NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "services_to_features" (
	"service_id" uuid NOT NULL,
	"feature_id" uuid NOT NULL,
	CONSTRAINT "services_to_features_service_id_feature_id_pk" PRIMARY KEY("service_id","feature_id")
);
--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_photographer_id_user_id_fk" FOREIGN KEY ("photographer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services_to_features" ADD CONSTRAINT "services_to_features_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services_to_features" ADD CONSTRAINT "services_to_features_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;