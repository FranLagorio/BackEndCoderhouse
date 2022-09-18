//Import de librerias
const express = require("express");
const routerCarts = require("./routers/cart");
const routerProducts = require("./routers/product");

const app = express();
//Middleware para lectura de Json desde servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/carritos", routerCarts);
app.use("/api/productos", routerProducts);

//Inicio de express y configuracion de servidor//Creacion del servidor//Manejo de errores del servidor
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server Listening on ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on Server: ${error}`));

app.all("*", (req, res) => {
  res.status(404).json({
    error: -1,
    descripcion: `ruta ${req.url} método ${req.method} no autorizada`,
  });
});

//Middleware para acceso a carpeta public
//app.use("/public", express.static(__dirname + "/public"));
