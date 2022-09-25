const mongoose = require("mongoose");
const Products = require("../../models/schemaProduct");

class ProductManager {
  //FORMA LOCAL
  async connectMDB() {
    try {
      return (
        await mongoose.connect("mongodb://localhost:27017/ecommerce"),
        { useNewUrlParser: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async save(product) {
    try {
      await this.connectMDB();
      let timestamp = new Date();
      let products = await this.getAll();
      product.timestamp = timestamp.toString();
      if (products.length > 0) {
        product.idProd = products[products.length - 1].idProd + 1;
      } else {
        product.idProd = 1;
      }
      await Products.create(product);
      mongoose.disconnect();
      return product;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      await this.connectMDB();
      const products = await Products.find({});
      mongoose.disconnect();
      return products;
    } catch (error) {
      throw Error(error.message);
    }
  }

  getById = async (id) => {
    try {
      await this.connectMDB();
      let product = await Products.findById(id);
      mongoose.disconnect();
      if (product != null) {
        return product;
      } else {
        throw new Error("Product didn't found with that ID");
      }
    } catch (error) {
      throw Error(error);
    }
  };

  updateById = async (id, objUpdate) => {
    try {
      await this.connectMDB();
      await Products.findByIdAndUpdate(id, objUpdate);
      mongoose.disconnect();
      return await this.getById(id);
    } catch (error) {
      throw Error(error.message);
    }
  };

  deleteById = async (id) => {
    try {
      await this.connectMDB();
      await this.getById(id);
      await Products.findByIdAndDelete(id);
      mongoose.disconnect();
      return id;
    } catch (error) {
      throw Error(error.message);
    }
  };
}

module.exports = ProductManager;

//FORMA REMOTA
// async connectMDB() {
//   try {
//     return (
//       await mongoose.connect(
//         "mongodb+srv://franchas123:fran123@cluster0.zqkvn9v.mongodb.net/?retryWrites=true&w=majority"
//       ),
//       { useNewUrlParser: true }
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }
