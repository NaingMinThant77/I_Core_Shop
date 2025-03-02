CREATE TABLE "two_factor_token" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	"userId" text
);
--> statement-breakpoint
ALTER TABLE "two_factor_token" ADD CONSTRAINT "two_factor_token_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;