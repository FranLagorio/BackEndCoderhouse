const { Router } = require("express");

const { productController } = require("../controller/productController");

const productRouter = Router();

productRouter.get("/", productController.getData);

module.exports = productRouter;
