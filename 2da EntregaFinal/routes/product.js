const express = require("express");
const { productController } = require("../controllers/index");

const productRouter = express.Router();

// Middleware isAdmin
const isAdmin = true;
const checkAdmin = (req, res, next) => {
  if (isAdmin) {
    next();
    return;
  } else {
    res.status(403).send({
      error: -1,
      descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizada`,
    });
  }
};
productRouter.get("/:id", productController.get);
productRouter.post("/", checkAdmin, productController.save);
productRouter.delete("/:id", checkAdmin, productController.delete);
productRouter.put("/:id", checkAdmin, productController.put);

module.exports = productRouter;
