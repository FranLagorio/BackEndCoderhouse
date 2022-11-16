const { ProductManager } = require("../../src/daos/mainDaos");

const productManager = new ProductManager();

const productController = {
  get: async (req, res) => {
    try {
      const { id } = req.params;
      let found;
      if (id === "all") {
        found = await productManager.getAll();
      } else {
        found = await productManager.getById(id);
      }
      res.status(200).send({
        status: 200,
        data: { found },
        message: "Get successfully",
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  },
  save: async (req, res) => {
    let necessaryProps = [
      "name",
      "description",
      "code",
      "thumbnail",
      "price",
      "stock",
    ];
    try {
      const { body } = req;
      //Check de si estan todas las props necesarias
      let keys = Object.keys(body);
      let check = (arr, target) => target.every((e) => arr.includes(e));
      let validation = check(keys, necessaryProps);
      if (validation) {
        await productManager.save(body);
        let products = await productManager.getAll();
        res.status(200).send({
          status: 200,
          data: { products },
          message: "Uploaded Product",
        });
      } else {
        res.status(500).send({
          status: 500,
          message:
            "Must submit all necessary props:name,description,code,thumbnail, price, stock",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      let productToDelete = await productManager.deleteById(id);
      res.status(200).send({
        status: 200,
        data: { productToDelete },
        message: `Product Deleted successfully`,
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
  put: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      let puttedProduct = await productManager.updateById(id, body);
      res.status(200).send({
        status: 200,
        data: { product: puttedProduct },
        message: "Updated successfully",
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },
};

module.exports = productController;
