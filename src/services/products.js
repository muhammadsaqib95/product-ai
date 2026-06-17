import { and, eq, gte, lte, arrayOverlaps } from "drizzle-orm";
import db from "../db.js";
import { productsTable } from "../schemas/products.js";

export async function listProducts({ limit = 10, offset = 0, min_price, max_price, sizes, colors, tags } = {}) {
    const filters = [];
    if (min_price != null) filters.push(gte(productsTable.price, min_price));
    if (max_price != null) filters.push(lte(productsTable.price, max_price));
    if (sizes?.length)   filters.push(arrayOverlaps(productsTable.sizes, sizes));
    if (colors?.length)  filters.push(arrayOverlaps(productsTable.colors, colors));
    if (tags?.length)    filters.push(arrayOverlaps(productsTable.tags, tags));

    const products = await db
        .select()
        .from(productsTable)
        .where(filters.length ? and(...filters) : undefined)
        .limit(limit)
        .offset(offset);

    return { products, count: products.length };
}

export async function getProduct(id) {
    const [product] = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, id))
        .limit(1);

    return product ?? null;
}
