const express = require("express");
const { cartController } = require("../controllers/index");

const cartRouter = express.Router();

cartRouter.get("/:id/productos", cartController.get);
cartRouter.post("/", cartController.createCart);
cartRouter.post("/:id/productos", cartController.saveProductInCart);
cartRouter.delete("/:id", cartController.delete);
cartRouter.delete("/:id/productos/:idProd", cartController.deteleProductInCart);

module.exports = cartRouter;
