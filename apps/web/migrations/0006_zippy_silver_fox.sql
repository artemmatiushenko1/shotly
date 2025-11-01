CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"country" varchar(256) NOT NULL,
	"latitude" numeric(9, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "provider_id_idx" UNIQUE("id","name")
);
--> statement-breakpoint
CREATE TABLE "users_to_locations" (
	"user_id" text NOT NULL,
	"location_id" uuid NOT NULL,
	CONSTRAINT "users_to_locations_user_id_location_id_pk" PRIMARY KEY("user_id","location_id")
);
--> statement-breakpoint
ALTER TABLE "users_to_locations" ADD CONSTRAINT "users_to_locations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_locations" ADD CONSTRAINT "users_to_locations_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "users_to_locations_user_idx" ON "users_to_locations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_to_locations_location_idx" ON "users_to_locations" USING btree ("location_id");