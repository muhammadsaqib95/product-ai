import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";

export const sizeEnum = pgEnum("size", ["S", "M", "L", "XL"]);
export const priceCurrencyEnum = pgEnum("price_currency", ["USD", "EUR", "GBP"]);

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  images: varchar({ length: 255 }).array().notNull(),
  sizes: sizeEnum().array().notNull(),
  sku: varchar({ length: 255 })
    .notNull()
    .unique()
    .$defaultFn(() => `SKU-${crypto.randomUUID().split("-")[0].toUpperCase()}`),
  slug: varchar({ length: 255 }).notNull().unique(),
  tags: varchar({ length: 255 }).array().notNull(),
  colors: varchar({ length: 255 }).array().notNull(),
  inventory_quantity: integer().notNull(),
  price: integer().notNull(),
  price_currency: priceCurrencyEnum().notNull().$default("USD"),
});
