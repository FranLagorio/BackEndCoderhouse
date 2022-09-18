const express = require("express");
const { productDaos: ProductManager } = require("../daos/mainDaos");

// const productRoute = "./products.txt";
const routerProducts = express.Router();
const productManager = new ProductManager();

// Middleware isAdmin
const isAdmin = true;
const checkAdmin = (req, res, next) => {
  // const { isAdmin } = req.query;
  // if (parseInt(isAdmin)) {
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

///////// GET by ID or ALL
routerProducts.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let found;
    if (id === "all") {
      found = await productManager.getAll();
    } else {
      found = await productManager.getById(id);
    }
    res.status(200).send({
      status: 200,
      data: { found },
      message: "Get successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

///////// POST -- Solo para Admins
routerProducts.post("/", checkAdmin, async (req, res) => {
  try {
    const { body } = req;
    //Check de si estan todas las props necesarias
    let keys = Object.keys(body);
    let check = (arr, target) => target.every((e) => arr.includes(e));
    let validation = check(keys, necessaryProps);
    if (validation) {
      await productManager.save(body);
      let products = await productManager.getAll();
      res.status(200).send({
        status: 200,
        data: { products },
        message: "Uploaded Product",
      });
    } else {
      res.status(500).send({
        status: 500,
        message:
          "Must submit all necessary props:name,description,code,thumbnail, price, stock",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

///////// PUT - Product - solo para Admins
routerProducts.put("/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    let puttedProduct = await productManager.updateById(id, body);
    res.status(200).send({
      status: 200,
      data: { product: puttedProduct },
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

///////// DELETE By ID - solo para Admins
routerProducts.delete("/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    let productToDelete = await productManager.deleteById(id);
    res.status(200).send({
      status: 200,
      data: { id: productToDelete },
      message: `Product Deleted successfully`,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

/////// NECCESARY PROPS

let necessaryProps = [
  "name",
  "description",
  "code",
  "thumbnail",
  "price",
  "stock",
];

module.exports = routerProducts;
