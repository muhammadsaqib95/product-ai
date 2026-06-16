import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { ordersTable } from "./orders.js";
import { productsTable, sizeEnum } from "./products.js";

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  order_id: integer()
    .notNull()
    .references(() => ordersTable.id),
  product_id: integer()
    .notNull()
    .references(() => productsTable.id),
  quantity: integer().notNull().default(1),
  unit_price: integer().notNull(), // snapshot of price at time of order
  selected_color: varchar({ length: 100 }),
  selected_size: sizeEnum(), // reuse your existing enum
});
