const express = require("express");
const { cartDaos: CartManager } = require("../daos/mainDaos");

const routerCarts = express.Router();
const cartManager = new CartManager();

///////// GET CART By ID or ALL
routerCarts.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  try {
    let cartProducts;
    if (id === "all") {
      cartProducts = await cartManager.getAll();
    } else {
      cartProducts = await cartManager.getCartById(id);
    }
    res.status(200).send({
      status: 200,
      data: {
        carts: cartProducts,
      },
      message: "Cart Found",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cart doesn't exist",
    });
  }
});

///////// POST CART
routerCarts.post("/", async (req, res) => {
  try {
    let newCart = await cartManager.newCart();
    res.status(200).send({
      status: 200,
      data: {
        id: newCart,
      },
      message: "New cart created",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Cart didn't create",
    });
  }
});

///////// DELETE CART By ID
routerCarts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let cartToDelete = await cartManager.deleteCartById(id);
    res.status(200).send({
      status: 200,
      data: {
        deletedCart: cartToDelete,
      },
      message: "Cart deleted",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "ID doesn't exist",
    });
  }
});

///////// POST PRODUCTS TO CART By ID
routerCarts.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    let cart = await cartManager.saveProductToCart(id, body.idProd);
    res.status(200).send({
      status: 200,
      data: {
        cart,
      },
      message: "Product Charged",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

///////// DELETE PRODUCTS IN CART By ID
routerCarts.delete("/:id/productos/:idProd", async (req, res) => {
  try {
    const { id, idProd } = req.params;
    let newCartList = await cartManager.deleteProdInCart(id, idProd);
    res.status(200).send({
      status: 200,
      data: {
        newCartList,
      },
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

module.exports = routerCarts;
