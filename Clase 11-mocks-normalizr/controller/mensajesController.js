import mongoose from "mongoose";
import Mensajes from "../models/schemaMensaje.js";

class MensajesController {
  async connectMDB() {
    try {
      return (
        await mongoose.connect(
          "mongodb+srv://franchas123:fran123@cluster0.zqkvn9v.mongodb.net/?retryWrites=true&w=majority"
        ),
        { useNewUrlParser: true }
      );
    } catch (e) {
      console.log(e);
    }
  }

  async save(mensaje) {
    try {
      await this.connectMDB();
      let timestamp = new Date();
      let mensajes = await this.getAll();
      mensaje.timestamp = timestamp.toString();
      if (mensajes.length > 0) {
        mensaje.idProd = mensajes[mensajes.length - 1].idProd + 1;
      } else {
        mensaje.idProd = 1;
      }
      await Mensajes.create(mensaje);
      mongoose.disconnect();
      return mensaje;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      await this.connectMDB();
      const mensajes = await Mensajes.find({});
      mongoose.disconnect();
      return mensajes;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

export default MensajesController;
