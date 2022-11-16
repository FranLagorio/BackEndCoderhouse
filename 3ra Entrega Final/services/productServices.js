const { findAll } = require("../daos/productsDaos");

const ProductManager = {
  getAll: async () => {
    let products = await findAll();
    return products;
  },
};

module.exports = ProductManager;
