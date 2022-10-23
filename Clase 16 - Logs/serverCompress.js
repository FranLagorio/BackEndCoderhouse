const express = require("express");
const compression = require("compression");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression());

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

// console.log(frase);

app.get("/saludo", (req, res) => {
  let arr = [];
  let frase = "Hola que tal";
  for (let i = 0; i < 1000; i++) {
    arr.push(frase);
  }
  res.json(arr);
});

app.get("/saludozip", (req, res) => {
  app.use(compression());
  let arr = [];
  let frase = "Hola que tal";
  for (let i = 0; i < 1000; i++) {
    arr.push(frase);
  }
  res.json(arr);
});
