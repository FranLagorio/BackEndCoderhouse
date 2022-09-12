//Import de librerias
const fs = require("fs");
const express = require("express");

//Import de Clases
const FileManager = require("./src/FileManager");
const CartManager = require("./src/CartManager");

//Rutas fileSystem
const productsRoute = "./public/fileSystem/products.txt";
const cartRoute = "./public/fileSystem/cart.txt";

//Creacion de clases/objetos para el manejo de archivos
const fileManager = new FileManager(productsRoute);
const cartManager = new CartManager(cartRoute);

//Inicio de express y configuracion de servidor
const PORT = process.env.PORT || 8080;
const app = express();

//Middleware para lectura de Json desde servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion del router
const { Router } = express;
const routerProducts = Router();
const routerShopCart = Router();
app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerShopCart);

//Middleware para acceso a carpeta public
app.use("/public", express.static(__dirname + "/public"));

//Creacion del servidor
const server = app.listen(PORT, () => {
  console.log(`Server Listening on ${server.address().port}`);
});

//Manejo de errores del servidor
server.on("error", (error) => console.log(`Error on Server: ${error}`));

//Variable Admins
let isAdmin = false;

// Middleware isAdmin

const checkAdmin = (req, res, next) => {
  if (isAdmin) {
    next();
    return;
  } else {
    res.status(403).send({
      error: -1,
      descripcion: `ruta ${req.baseUrl} método ${req.method} no autorizada`,
    });
  }
};

//Ruta de acceso a html (no aplica a este ejercicio)
app.get("/public", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//PRODUCTOS

///////// Metodo GET ALL PRODUCTS
routerProducts.get("/", (req, res) => {
  let products = fileManager.getAll();
  res.json(products);
});

///////// GET by ID
routerProducts.get("/:id", (req, res) => {
  const { id } = req.params;
  let foundProduct = fileManager.getById(id);
  res.json(foundProduct);
});

///////// POST -- Solo para Admins
routerProducts.post("/", checkAdmin, (req, res) => {
  const { body } = req;
  //Check de si estan todas las props necesarias
  let keys = Object.keys(body);
  let check = (arr, target) => target.every((e) => arr.includes(e));
  let validation = check(keys, necessaryProps);

  if (validation) {
    fileManager.saveProduct(body);
    let products = fileManager.getAll();
    res.json(products);
  } else {
    res.json("Las props no son iguales");
  }
});

///////// PUT - Product
routerProducts.put("/:id", checkAdmin, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let puttedProduct = fileManager.updateById(id, body);
  res.json(puttedProduct);
});

///////// DELETE By ID
routerProducts.delete("/:id", checkAdmin, (req, res) => {
  const { id } = req.params;
  let deletedProduct = fileManager.deleteById(id);
  res.json(deletedProduct);
});

///////// CARRITO

///////// GET
// routerShopCart.get("/:id", (req, res) => {
//   const { id } = req.params;
//   res.json("hola");
// });

///////// POST EMPTY CART
routerShopCart.post("/", (req, res) => {
  let newCart = cartManager.saveCart();
  res.json(newCart);
});

///////// DELETE CART By ID
routerShopCart.delete("/:id", (req, res) => {
  const { id } = req.params;
  let cartList = cartManager.deleteCartById(id);
  res.json(cartList);
});

///////// GET CART By ID
routerShopCart.get("/:id/productos", (req, res) => {
  const { id } = req.params;
  let cartProducts = cartManager.getCartById(id);

  if (cartProducts != undefined) {
    if (cartProducts.productos.length > 0) {
      res.json(cartProducts.productos);
    } else {
      res.json("No existen productos en este carrito");
    }
  } else {
    res.json("No existen productos en este carrito");
  }
});

///////// POST PRODUCTS TO CART By ID
routerShopCart.post("/:id/productos", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  let productSelected = fileManager.getById(body.id);
  let cartProducts;

  if (productSelected.code != 0) {
    cartProducts = cartManager.saveProductToCart(id, productSelected);
    res.json(cartProducts);
  } else {
    res.json("No se encontro el producto");
  }
});

///////// DELETE PRODUCTS IN CART By ID
routerShopCart.delete("/:id/productos/:id_prod", (req, res) => {
  const { id, id_prod } = req.params;
  let newCartList = cartManager.deleteProdInCart(id, id_prod);
  res.json(newCartList);
});

///////// ESTRUCTURA DE PRODUCTO
// let product = {
//   id: 1,
//   timestamp: new Date(),
//   name: "producto1",
//   description: "es un buen producto",
//   code: 123,
//   thumbnail: "www.google.com",
//   price: 120,
//   stock: 100,
// };

///////// ESTRUCTURA DE CARRITO
// let product = {
//   id: 1,
//   timestamp: new Date(),
//   products: [{
// //   id: 1,
// //   timestamp: new Date(),
// //   name: "product1"
// //   description: "es un buen producto",
// //   code: 123,
// //   thumbnail: "www.google.com",
// //   price: 120,
// //   stock: 100,
//      }]
// };

let necessaryProps = [
  "name",
  "description",
  "code",
  "thumbnail",
  "price",
  "stock",
];

app.all("*", (req, res) => {
  res.status(404).json({
    error: -1,
    descripcion: `ruta ${req.url} método ${req.method} no autorizada`,
  });
});
