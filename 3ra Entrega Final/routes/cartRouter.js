const { Router } = require("express");
const cartRouter = Router();

const cartController = require("../controller/cartController");

cartRouter.get("/", cartController.get);
cartRouter.post("/", cartController.postBuy);
cartRouter.post("/product", cartController.post);
cartRouter.delete("/:id/:idProd", cartController.deleteProd);
cartRouter.delete("/:id", cartController.deleteProdbyPage);

module.exports = cartRouter;
