const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    image: { type: String, required: false },
    cart_id: { type: mongoose.Schema.ObjectId },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Users", UserSchema);
