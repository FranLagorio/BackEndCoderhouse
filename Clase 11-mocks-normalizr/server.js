import express from "express";
const app = express();
const PORT = 8080;

import { engine } from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/public", express.static(__dirname + "/public"));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

import products from "./src/productGenerator.js";
let productsExist = products.length > 0 ? true : false;
console.log(productsExist);
app.get("/", (req, res) => {
  res.render("indexChat", { products: products, productsExist: productsExist });
});
