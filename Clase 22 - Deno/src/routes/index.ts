import { Router } from "../deps.ts";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findProduct,
  updateProduct,
} from "../handlers/products.ts";
export const router = new Router()
  //product routes
  .get("/api/products", findAllProducts)
  .get("/api/products/:productId", findProduct)
  .post("/api/products", createProduct)
  .patch("/api/products/:productId", updateProduct)
  .delete("/api/products/:productId", deleteProduct);
