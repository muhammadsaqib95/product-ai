CREATE TYPE "public"."size" AS ENUM('S', 'M', 'L', 'XL');--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order_items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" integer NOT NULL,
	"selected_color" varchar(100),
	"selected_size" "size"
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"order_status" "order_status" DEFAULT 'pending' NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"payment_method" varchar(50),
	"payment_status" varchar(50),
	"shipping_name" varchar(255),
	"shipping_phone" varchar(50),
	"shipping_address" varchar(500),
	"shipping_city" varchar(100),
	"shipping_state" varchar(100),
	"shipping_zip" varchar(20),
	"shipping_country" varchar(100),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"images" varchar(255)[] NOT NULL,
	"sizes" "size"[] NOT NULL,
	"sku" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"tags" varchar(255)[] NOT NULL,
	"colors" varchar(255)[] NOT NULL,
	"inventory_quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"price_currency" "price_currency" NOT NULL,
	CONSTRAINT "products_sku_unique" UNIQUE("sku"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;