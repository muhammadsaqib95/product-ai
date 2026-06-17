import { eq, ilike, or } from "drizzle-orm";
import db from "../db.js";
import { usersTable } from "../schemas/users.js";

export async function listUsers({ limit = 10, offset = 0, search } = {}) {
    const filters = [];
    if (search) {
        filters.push(or(
            ilike(usersTable.name, `%${search}%`),
            ilike(usersTable.email, `%${search}%`)
        ));
    }

    const users = await db
        .select()
        .from(usersTable)
        .where(filters.length ? filters[0] : undefined)
        .limit(limit)
        .offset(offset);

    return { users, count: users.length };
}

export async function getUser(id) {
    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .limit(1);

    return user ?? null;
}
