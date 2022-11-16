const Products = require("../models/productSchema");

async function findAll() {
  let products = await Products.find({});
  return products;
}

module.exports = { findAll };
