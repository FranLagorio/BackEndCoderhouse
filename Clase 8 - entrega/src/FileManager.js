// const { optionsMDB } = require("../options/optionsMDB");
// const knex = require("knex")(optionsMDB);

class FileManager {
  constructor(specificKnex, table) {
    this.knex = specificKnex;
    this.productsTable = table;
  }

  createTable = () => {
    let name = this.productsTable;
    let knex = this.knex;
    knex.schema
      .hasTable(name)
      .then(function (exists) {
        if (!exists) {
          return knex.schema.createTable(name, function (table) {
            table.increments("id").primary();
            table.string("name", 100).notNullable();
            table.string("description", 100).notNullable;
            table.integer("code").notNullable;
            table.text("thumbnail").notNullable;
            table.float("price").unsigned();
            table.integer("stock").unsigned();
            table
              .datetime("timestamp", { precision: 6 })
              .defaultTo(knex.fn.now(6));
          });
        } else {
        }
      })
      .then(() => {})
      .catch((err) => console.log(err));
  };

  getAll = async () => {
    try {
      let products;

      await this.knex(this.productsTable)
        .select("*")
        .then((res) => {
          res = res.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            code: product.code,
            thumbnail: product.thumbnail,
            price: product.price,
            stock: product.stock,
            timestamp: product.timestamp,
          }));
          products = res;
        });
      return products;
    } catch (err) {
      console.log(
        "Hay un problema, puede que este sea el inicio de la tabla, recargue la pagina y vea si este mensaje vuelve a emitirse, caso contrario todo esta OK"
      );
    }
  };

  saveProduct = async (object) => {
    try {
      await this.knex(this.productsTable)
        .insert({
          name: object.name,
          description: object.description,
          code: object.code,
          thumbnail: object.thumbnail,
          price: object.price,
          stock: object.stock,
        })
        .then(() => console.log("Producto Cargado"));
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = FileManager;
