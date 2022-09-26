import { Router } from "express";
import createNFakeProducts from "../models/mocks/productGenerator.js";

const productosApiRouter = new Router();

productosApiRouter.get("/api/productos-test", (req, res) => {
  let products = createNFakeProducts(5);
  if (products.length > 0) {
    res.render("pages/index", { products: products, productsExist: true });
  } else {
    res.render("pages/index", { products: products, productsExist: false });
  }
});

export default productosApiRouter;
