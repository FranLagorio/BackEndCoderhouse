const mongoose = require("mongoose");
const { schemaProduct } = require("./productSchema");

const schemaCart = new mongoose.Schema(
  {
    products: [schemaProduct],
    user_id: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);
const Carts = mongoose.model("Cart", schemaCart);

module.exports = { Carts, schemaCart };
