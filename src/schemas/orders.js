import { integer, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
]);

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull(),
  order_status: statusEnum().notNull().default("pending"),
  total: integer().notNull().default(0), // in cents
  
  // payment
  payment_method: varchar({ length: 50 }),   // 'cod', 'card', 'bank_transfer'
  payment_status: varchar({ length: 50 }),   // 'pending', 'paid', 'failed'
  
  // shipping address
  shipping_name: varchar({ length: 255 }),
  shipping_phone: varchar({ length: 50 }),
  shipping_address: varchar({ length: 500 }),
  shipping_city: varchar({ length: 100 }),
  shipping_state: varchar({ length: 100 }),
  shipping_zip: varchar({ length: 20 }),
  shipping_country: varchar({ length: 100 }),
  
  created_at: timestamp().defaultNow(),
});
