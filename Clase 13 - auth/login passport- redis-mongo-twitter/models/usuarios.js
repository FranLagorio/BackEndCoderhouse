const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: false, max: 100 },
  password: { type: String, required: false, max: 100 },
});
UsuarioSchema.plugin(findOrCreate);

const Usuarios = mongoose.model("usuarios", UsuarioSchema);
module.exports = Usuarios;
