const Products = require("../models/productSchema");

async function findAll() {
  return await Products.find({});
}

module.exports = { findAll };
