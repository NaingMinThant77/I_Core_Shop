ALTER TABLE "orderProduct" ADD COLUMN "OrdeID" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "customerId" text;--> statement-breakpoint
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_OrdeID_orders_id_fk" FOREIGN KEY ("OrdeID") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;