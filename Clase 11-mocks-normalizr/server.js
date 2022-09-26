import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import addMensajesSocketsHandler from "./routes/mensajes.js";
import productosApiRouter from "./routes/product.js";

//Creacion de Servidor y Sockets
const app = express();
const PORT = 8080;
const httpServer = createServer(app);
const io = new Server(httpServer, {});

//Inicio de Servidor
httpServer.listen(process.env.PORT || PORT, () =>
  console.log("Servidor Funcionando en Puerto: " + PORT)
);
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));

//Configuro Servidor
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//ruta de servidor Api Rest
app.use(productosApiRouter);

//Configuro Socket
io.on("connection", async (socket) => {
  console.log("Nuevo Cliente Conectado: " + socket.id);
  addMensajesSocketsHandler(socket, io.sockets);
});
