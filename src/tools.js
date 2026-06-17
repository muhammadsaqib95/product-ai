import { listProducts, getProduct } from "./services/products.js";
import { listUsers, getUser } from "./services/users.js";
import { listOrders, getOrder } from "./services/orders.js";

// LLMs sometimes return array arguments as stringified arrays e.g. "['white']"
function toArray(v) {
    if (!v) return undefined;
    if (Array.isArray(v)) return v;
    try { const p = JSON.parse(v); return Array.isArray(p) ? p : [String(v)]; } catch { return [String(v)]; }
}

export async function executeTool(name, input) {
    if (name === "list_products") {
        const { limit, offset, min_price, max_price, sizes, colors, tags } = input;
        const result = await listProducts({
            limit, offset, min_price, max_price,
            sizes: toArray(sizes),
            colors: toArray(colors),
            tags: toArray(tags),
        });
        return JSON.stringify(result);
    }

    if (name === "list_users") {
        const { limit, offset, search } = input;
        const result = await listUsers({ limit, offset, search });
        return JSON.stringify(result);
    }

    if (name === "list_orders") {
        const { limit, offset, user_id, order_status, payment_status, min_total, max_total } = input;
        const result = await listOrders({ limit, offset, user_id, order_status, payment_status, min_total, max_total });
        return JSON.stringify(result);
    }

    if (name === "get_product") {
        const result = await getProduct(input.id);
        return JSON.stringify(result);
    }

    if (name === "get_user") {
        const result = await getUser(input.id);
        return JSON.stringify(result);
    }

    if (name === "get_order") {
        const result = await getOrder(input.id);
        return JSON.stringify(result);
    }

    throw new Error(`Unknown tool: ${name}`);
}

export const tools = [
    {
        name: "list_products",
        description: "List products from the store. Supports filtering by price range, sizes, colors, and tags, as well as pagination.",
        input_schema: {
            type: "object",
            properties: {
                limit: {
                    type: "integer",
                    description: "Maximum number of products to return. Defaults to 10.",
                    minimum: 1,
                    maximum: 100,
                },
                offset: {
                    type: "integer",
                    description: "Number of products to skip for pagination. Defaults to 0.",
                    minimum: 0,
                },
                min_price: {
                    type: "integer",
                    description: "Minimum price in cents (e.g. 1000 = $10.00).",
                },
                max_price: {
                    type: "integer",
                    description: "Maximum price in cents (e.g. 5000 = $50.00).",
                },
                sizes: {
                    type: "array",
                    items: {
                        type: "string",
                        enum: ["S", "M", "L", "XL"],
                    },
                    description: "Filter products that have at least one of these sizes available.",
                },
                colors: {
                    type: "array",
                    items: { type: "string" },
                    description: "Filter products that have at least one of these colors available.",
                },
                tags: {
                    type: "array",
                    items: { type: "string" },
                    description: "Filter products that match at least one of these tags.",
                },
            },
            required: [],
        },
    },
    {
        name: "list_users",
        description: "List users. Supports searching by name or email, and pagination.",
        input_schema: {
            type: "object",
            properties: {
                limit: {
                    type: "integer",
                    description: "Maximum number of users to return. Defaults to 10.",
                    minimum: 1,
                    maximum: 100,
                },
                offset: {
                    type: "integer",
                    description: "Number of users to skip for pagination. Defaults to 0.",
                    minimum: 0,
                },
                search: {
                    type: "string",
                    description: "Search term matched against user name or email (case-insensitive).",
                },
            },
            required: [],
        },
    },
    {
        name: "list_orders",
        description: "List orders. Supports filtering by user, order status, payment status, and total amount range, as well as pagination.",
        input_schema: {
            type: "object",
            properties: {
                limit: {
                    type: "integer",
                    description: "Maximum number of orders to return. Defaults to 500",
                    minimum: 1,
                    maximum: 500,
                },
                offset: {
                    type: "integer",
                    description: "Number of orders to skip for pagination. Defaults to 0.",
                    minimum: 0,
                },
                user_id: {
                    type: "integer",
                    description: "Filter orders belonging to this user ID.",
                },
                order_status: {
                    type: "string",
                    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
                    description: "Filter by order status.",
                },
                payment_status: {
                    type: "string",
                    enum: ["pending", "paid", "failed"],
                    description: "Filter by payment status.",
                },
                min_total: {
                    type: "integer",
                    description: "Minimum order total in cents (e.g. 1000 = $10.00).",
                },
                max_total: {
                    type: "integer",
                    description: "Maximum order total in cents (e.g. 10000 = $100.00).",
                },
            },
            required: [],
        },
    },
    {
        name: "get_product",
        description: "Fetch a single product by its ID.",
        input_schema: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "The product ID.",
                },
            },
            required: ["id"],
        },
    },
    {
        name: "get_user",
        description: "Fetch a single user by their ID.",
        input_schema: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "The user ID.",
                },
            },
            required: ["id"],
        },
    },
    {
        name: "get_order",
        description: "Fetch a single order by its ID, including all line items (product, quantity, price, size, color).",
        input_schema: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "The order ID.",
                },
            },
            required: ["id"],
        },
    },
];
