import { Router } from "express";
import productsApi from "./api/products.js";
import aiApi from "./api/ai.js";

const api = Router();

api.use("/products", productsApi);
api.use("/ai", aiApi);

export default api;