const fs = require("fs");

class FileManager {
  constructor(file) {
    this.file = file;
  }

  getAll = () => {
    try {
      let data = fs.readFileSync(this.file, "utf-8");
      let dataParsed = JSON.parse(data);
      return dataParsed;
    } catch (error) {
      console.log(
        "Algo salio mal y no se obtienen productos! ",
        "(puede que este sea la creacion o no este creado el archivo file)"
      );
    }
  };

  getById = (id) => {
    try {
      let productList = this.getAll();
      let foundProduct = productList.find((element) => element.id == id);
      if (foundProduct == undefined) {
        return { error: `No existe producto con el ID: ${id}`, code: 0 };
      }
      return foundProduct;
    } catch (error) {
      return error;
    }
  };

  saveProduct = (object) => {
    try {
      let productList = this.getAll();
      if (productList.length > 0) {
        // object.id = productList[productList.length - 1].id + 1;
        // object.timestamp = new Date();
        let newObj = {
          id: productList[productList.length - 1].id + 1,
          timestamp: new Date(),
          ...object,
        };
        productList.push(newObj);
        const productsJson = JSON.stringify(productList, null, 2);
        fs.writeFileSync(this.file, productsJson);
        console.log(`Se ha agregado ${newObj.title} como un nuevo producto`);
        return productList;
        //
      } else {
        let productList = [];
        let newObj = {
          id: 1,
          timestamp: new Date(),
          ...object,
        };
        productList.push(newObj);
        const productsJson = JSON.stringify(productList, null, 2);
        fs.writeFileSync(this.file, productsJson);
        console.log(`Se ha agregado ${newObj.title} como un nuevo producto`);
        return productList;
      }
    } catch (err) {
      let productList = [];
      let newObj = {
        id: 1,
        timestamp: new Date(),
        ...object,
      };
      productList.push(newObj);
      fs.writeFileSync(this.file, JSON.stringify(productList, null, 2));
      return productList;
    }
  };

  updateById = (id, objUpdate) => {
    try {
      let productList = this.getAll();
      let productToUpdate = productList.find((element) => element.id == id);
      let indexToUpdate = productList.findIndex((element) => element.id == id);
      if (productList[indexToUpdate]) {
        productList[indexToUpdate] = {
          ...productList[indexToUpdate],
          ...objUpdate,
        };
      } else {
        throw error;
      }
      this.deleteAll();
      fs.writeFileSync(this.file, JSON.stringify(productList, null, 2));
      return productList[indexToUpdate];
    } catch (error) {
      return "No se encontro ese ID";
    }
  };

  deleteById = (id) => {
    try {
      let productList = this.getAll();
      let productToDelete = productList.findIndex(
        (element) => element.id == id
      );
      if (productToDelete + 1 !== 0) {
        this.deleteAll;
        productList.splice(productToDelete, 1);
        fs.writeFileSync(this.file, JSON.stringify(productList, null, 2));
        return productList;
      } else {
        throw error;
      }
    } catch (error) {
      return "No se encontro ese ID";
    }
  };

  deleteAll = () => {
    let arr = [];
    fs.writeFileSync(this.file, JSON.stringify(arr));
  };
}

module.exports = FileManager;
