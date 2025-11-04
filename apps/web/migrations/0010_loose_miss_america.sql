ALTER TABLE "features" DROP CONSTRAINT "features_name_unique";--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "photographer_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "features_photographer_id_user_id_fk" FOREIGN KEY ("photographer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "photographer_name_idx" ON "features" USING btree ("photographer_id","name");