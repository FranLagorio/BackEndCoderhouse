const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Users", UserSchema);
