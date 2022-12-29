const { createCart, getCart, saveToCart } = require("../services/cartServices");
const { userUpdate } = require("../services/userServices");
const { errorLogger } = require("../src/utils/loggers");

const homeController = {
  get: async (req, res) => {
    // console.log(req.session);
    // console.log(req.user);
    // console.log(req.query.secret_token);
    // console.log(req.isAuthenticated());

    res.json({
      user: req.user ? req.user : false,
      query: req.query.secret_token ? req.query.secret_token : false,
      session: req.session,
      isAuthenticated: req.isAuthenticated(),
    });
    // try {

    //   if (req.isAuthenticated()) {

    //     const { cart_id } = req.user;

    //     if (!cart_id) {
    //       let newCartId = await createCart(req.user._id);
    //       await userUpdate(req.user._id, newCartId);
    //     }
    //     res.render("pages/home", {
    //       user: req.user,
    //     });
    //   } else {
    //     res.redirect("/login/faillogin");
    //   }
    // } catch (error) {
    //   errorLogger.error({
    //     error: error.message,
    //   });
    //   res.status(500).send({
    //     status: 500,
    //     message: error.message,
    //   });
    // }
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
