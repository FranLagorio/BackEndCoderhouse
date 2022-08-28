const { options } = require("./options/optionsMDB");
const knex = require("knex")(options);

//CREAR TABLA

// knex.schema
//   .createTable("products", (table) => {
//     table.increments("id_product"),
//       table.string("name"),
//       table.integer("price"),
//       table.integer("stock");
//   })
//   .then(() => {
//     console.log("todo bien");
//   })
//   .catch((err) => {
//     console.log(err);
//     throw new Error(err);
//   })
//   .finally(() => {
//     knex.destroy();
//   });

const products = [
  { name: "cartera", price: 100, stock: 12 },
  { name: "pelota", price: 11, stock: 2 },
  { name: "zapato", price: 500, stock: 25 },
];

//POST

// knex("products")
//   .insert(products)
//   .then((res) => {
//     console.log("todo ok", res);
//   })
//   .catch((e) => console.log(e));

//////////////// GET

// knex
//   .from("products")
//   .select("*")
//   .then((res) => {
//     /* res = res.map((item) => ({
//       idProduct: item["id_product"],
//       name: item.name,
//       price: item.price,
//       stock: item.stock,
//     })); */
//     res.forEach((item) => console.log(item));
//   })
//   .catch((e) => console.log(e))
//   .finally(() => knex.destroy());

///////////////OTRA FORMA
// knex("products")
//   .select("*")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => console.log(e)).finally(() => knex.destroy());;

///////////// ORDENAR SEGUN PROP
// knex("products")
//   .select("*")
//   .orderBy("price", "asc")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => console.log(e)).finally(() => knex.destroy());;

// knex("products").where("price", "9000")
//   .del()
//   .catch((e) => console.log(e))
//   .finally(() => knex.destroy());

// knex("products")
//   .where("id_product", "=", 19)
//   .update({ price: 120, stock: 120 })
//   .catch((e) => console.log(e))
//   .finally(() => knex.destroy());
