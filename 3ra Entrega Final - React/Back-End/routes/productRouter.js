const { Router } = require("express");

const { productController } = require("../controller/productController");

const productRouter = Router();

productRouter.get("/", productController.getData);

//export default productRouter;
module.exports = productRouter;
