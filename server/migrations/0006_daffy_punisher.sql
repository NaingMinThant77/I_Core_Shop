CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" real NOT NULL,
	"image" text NOT NULL,
	"createAt" timestamp DEFAULT now()
);
