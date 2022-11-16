const ProductManager = require("../services/productServices");

const homeController = {
  get: async (req, res) => {
    if (req.isAuthenticated()) {
      let products = await ProductManager.getAll();
      let productsExist = products.length > 0;
      //let products = [];
      res.render("pages/home", {
        user: req.user,
        productsExist,
        products,
      });
      res.end();
    } else {
      res.redirect("/login/faillogin");
    }
  },
  getInfo: async (req, res) => {
    if (req.isAuthenticated()) {
      res.render("pages/infoUser", {
        user: req.user,
      });
      res.end();
    } else {
      res.redirect("/login/faillogin");
    }
  },
};

module.exports = homeController;
