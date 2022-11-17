const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
  timestamp: { type: String, required: true },
  name: { type: String, required: true },
  // description: { type: String, required: true },
  // code: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});
const Products = mongoose.model("Products", schemaProduct);
module.exports = { Products, schemaProduct };
