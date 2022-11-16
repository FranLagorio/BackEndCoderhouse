const express = require("express");
// const productRouter = require("./src/routes/product");
// const cartRouter = require("./src/routes/cart");

const app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", require("./routes/product"));
app.use("/api/carritos", require("./routes/cart"));

const PORT = process.env.PORT || 8081;
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
