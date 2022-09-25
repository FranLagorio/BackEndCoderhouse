const { CartManager } = require("../../src/daos/mainDaos");
const cartManager = new CartManager();

const cartController = {
  get: async (req, res) => {
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
        message: error.message,
      });
    }
  },
  createCart: async (req, res) => {
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
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
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
        message: error.message,
      });
    }
  },
  saveProductInCart: async (req, res) => {
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
  },
  deteleProductInCart: async (req, res) => {
    try {
      const { id, idProd } = req.params;
      let productToDelete = await cartManager.deleteProdInCart(id, idProd);

      res.status(200).send({
        status: 200,
        idProductDeleted: productToDelete,
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
};

module.exports = cartController;
