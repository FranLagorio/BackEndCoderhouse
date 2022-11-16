const ProductManager = require("../services/productServices");

const homeController = {
  get: async (req, res) => {
    if (req.isAuthenticated()) {
      let products = await ProductManager.getAll();

      res.render("pages/home", {
        user: req.user,
        products,
      });
    } else {
      res.redirect("/login/faillogin");
    }
  },
};

module.exports = { homeController };
