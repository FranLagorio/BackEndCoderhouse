const { createCart, getCart, saveToCart } = require("../services/cartServices");
const { userUpdate } = require("../services/userServices");
const { errorLogger } = require("../src/utils/loggers");

const homeController = {
  get: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const { cart_id } = req.user;

        if (!cart_id) {
          let newCartId = await createCart(req.user._id);
          await userUpdate(req.user._id, newCartId);
        }
        res.render("pages/home", {
          user: req.user,
        });
      } else {
        res.redirect("/login/faillogin");
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
  getInfo: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.render("pages/infoUser", {
          user: req.user,
        });
        res.end();
      } else {
        res.redirect("/login/faillogin");
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
};

module.exports = homeController;
