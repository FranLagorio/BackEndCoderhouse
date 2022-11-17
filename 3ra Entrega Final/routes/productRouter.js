const { Router } = require("express");

const productController = require("../controller/productController");

const productRouter = Router();

productRouter.get("/", productController.get);
productRouter.get("/:id", productController.getIdProduct);
productRouter.post("/", productController.post);
productRouter.delete("/:id", productController.delete);
productRouter.put("/:id", productController.put);

module.exports = productRouter;
