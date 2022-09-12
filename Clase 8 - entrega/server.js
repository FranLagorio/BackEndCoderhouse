const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const PORT = 8080;

// Manejo de productos con MySql
const FileManager = require("./src/FileManager");
let productsTable = "products";
const { optionsMDB } = require("./options/optionsMDB");
const knexMariaDB = require("knex")(optionsMDB);
const fileManager = new FileManager(knexMariaDB, productsTable);

// Manejo de Mensajes con sqlite3
const MessagesManager = require("./src/MessagesManager");
let messagesTable = "messages";
const { optionsSQL3 } = require("./options/optionsSQL3");
const knexSQL3 = require("knex")(optionsSQL3);
const messagesManager = new MessagesManager(knexSQL3, messagesTable);

//IMPLEMENTACION DE SOCKETS
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

//INICIO SERVIDOR HTTP
httpServer.listen(process.env.PORT || PORT, () => console.log("SERVER ON"));
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));

// Middleware
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion del motor HANDLEBARS
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

app.get("/", async (req, res) => {
  await fileManager.createTable();

  let products = await fileManager.getAll();
  res.render("indexChat", { products: products, productsExist: true });
});

let chat = [];

io.on("connection", (socket) => {
  // console.log("Usuario Conectado" + socket.id);
  chat.push("se unio al chat " + socket.id);
  io.sockets.emit("arr-chat", chat);

  socket.on("new-product", async (data) => {
    await fileManager.saveProduct(data);
    let products = await fileManager.getAll();
    io.sockets.emit("newProduct", products);
  });

  socket.on("data-chat", async (data) => {
    await messagesManager.createTable();
    await messagesManager.saveMessage({
      name: data.email,
      message: data.message,
    });
    chat.push(data.messageHtml);
    io.sockets.emit("arr-chat", chat);
  });
});
