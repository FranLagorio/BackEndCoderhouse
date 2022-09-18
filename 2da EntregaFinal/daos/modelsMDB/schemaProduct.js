const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
  idProd: { type: Number, required: false },
  timestamp: { type: String, required: true },

  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model("Products", schemaProduct);

// import { Schema, model } from "mongoose";

// const UsuarioSchema = new Schema({
//   name: { type: String, required: true, max: 100 },
//   usuario: { type: String, required: true, max: 100 },
//   email: { type: String, required: true, max: 100 },
//   password: { type: Number, required: true },
// });

// export const Usuarios = model("usuarios", UsuarioSchema);
