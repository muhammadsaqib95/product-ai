import { Router } from "express";
import { listProducts } from "../services/products.js";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const { limit = 10, offset = 0, min_price, max_price, sizes, colors, tags } = req.query;

    const parseArray = (val) => {
      if (!val) return null;
      return Array.isArray(val) ? val : [val];
    };

    const result = await listProducts({
      limit: Number(limit),
      offset: Number(offset),
      min_price: min_price ? Number(min_price) * 100 : undefined,
      max_price: max_price ? Number(max_price) * 100 : undefined,
      sizes: parseArray(sizes),
      colors: parseArray(colors),
      tags: parseArray(tags),
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default route;