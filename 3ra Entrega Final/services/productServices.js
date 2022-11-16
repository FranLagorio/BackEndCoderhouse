const { findAll } = require("../daos/productsDaos");

const ProductManager = {
  getAll: async () => {
    return await findAll();
  },
};

module.exports = ProductManager;
