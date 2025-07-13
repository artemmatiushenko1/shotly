ALTER TABLE "users" ALTER COLUMN "lastName" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "passwordHash" varchar;