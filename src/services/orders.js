import { and, eq, gte, lte } from "drizzle-orm";
import db from "../db.js";
import { ordersTable } from "../schemas/orders.js";
import { orderItemsTable } from "../schemas/orderItems.js";

export async function listOrders({ limit = 500, offset = 0, user_id, order_status, payment_status, min_total, max_total } = {}) {
    const filters = [];
    if (user_id != null)       filters.push(eq(ordersTable.user_id, user_id));
    if (order_status)          filters.push(eq(ordersTable.order_status, order_status));
    if (payment_status)        filters.push(eq(ordersTable.payment_status, payment_status));
    if (min_total != null)     filters.push(gte(ordersTable.total, min_total));
    if (max_total != null)     filters.push(lte(ordersTable.total, max_total));

    const orders = await db
        .select()
        .from(ordersTable)
        .where(filters.length ? and(...filters) : undefined)
        .limit(limit)
        .offset(offset);

    return { orders, count: orders.length };
}

export async function getOrder(id) {
    const [order] = await db
        .select()
        .from(ordersTable)
        .where(eq(ordersTable.id, id))
        .limit(1);

    if (!order) return null;

    const items = await db
        .select()
        .from(orderItemsTable)
        .where(eq(orderItemsTable.order_id, id));

    return { ...order, items };
}
