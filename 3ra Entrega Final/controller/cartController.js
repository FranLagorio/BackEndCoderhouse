const {
  getCart,
  saveToCart,
  deleteProdInCart,
  deleteCart,
} = require("../services/cartServices");

const { getProduct } = require("../services/productServices");

const { sendPurchaseEmail } = require("../services/emailServices");
const sendSMS = require("../services/smsServices");
const sendWhatsapp = require("../services/whatsappServices");

const { errorLogger } = require("../src/utils/loggers");

const cartController = {
  get: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        let cart = await getCart(req.user.cart_id);

        res.render("pages/cart", { cartValid: true, cart });
      }
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  post: async (req, res) => {
    try {
      let cartId = await getCart(req.user.cart_id);
      let productToCart = await getProduct(req.body.prod_id);
      await saveToCart(cartId.id, productToCart);

      res.redirect("/cart");
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  deleteProdbyPage: async (req, res) => {
    try {
      const { id } = req.params;
      let cartId = await getCart(req.user.cart_id);
      let productToCart = await getProduct(id);

      let cart = await deleteProdInCart(cartId.id, productToCart);

      res.render("pages/cart", { cartValid: true, cart });
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  deleteProd: async (req, res) => {
    try {
      const { id, idProd } = req.params;

      let cartId = await getCart(id);
      let productToCart = await getProduct(idProd);

      let cart = await deleteProdInCart(cartId.id, productToCart);

      res.json(cart);
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  postBuy: async (req, res) => {
    try {
      let cart = await getCart(req.user.cart_id);
      let user = req.user;

      const formattedProducts = cart.products.map(
        (product) =>
          `Producto: ${product.name} <br />
        Precio: $${product.price}
        `
      );

      await sendPurchaseEmail(formattedProducts, user);
      await sendSMS("La orden fue confirmada, su pedido esta en proceso");
      await sendWhatsapp(
        "Se ha creado una nueva orden de compra de parte de: " + req.user.name
      );

      await deleteCart(req.user.cart_id);

      res.redirect("/home");
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
};
module.exports = cartController;
