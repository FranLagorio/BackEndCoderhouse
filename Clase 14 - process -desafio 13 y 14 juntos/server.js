import { createServer } from "http";
import express from "express";
import session from "express-session";
import { Server } from "socket.io";
import { socketController } from "./src/utils/socketController.js";
import { homeRouter, productRouter, loginRouter } from "./routes/index.js";
import MongoStore from "connect-mongo";
import { fork } from "child_process";
import parseArgs from "minimist";
// const args = parseArgs(process.argv.slice(2));
import { PORT } from "./config.js";

const args = parseArgs(process.argv.slice(2));
//Creacion de Servidor y Sockets
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {});
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
socketController(io);
//Inicio de Servidor
httpServer.listen(PORT, () =>
  console.log("Servidor Funcionando en Puerto: " + PORT)
);
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));

//Configuro Servidor
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion de Session
// app.use(
//   session({
//     secret: "secreto",
//     cookie: { maxAge: 600000 },
//     //resave viene de la documentacion
//     resave: true,
//     saveUninitialized: true,
//   })
// );

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://franchas123:fran123@cluster0.zqkvn9v.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: "secreto",
    cookie: { maxAge: 600000 },
    //resave viene de la documentacion
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  req.session.touch();
  next();
});

app.get("/", (req, res) => {
  res.send("Bienvenido al Ejercicio");
});

app.use("/api/products-test", productRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);

app.get("/logout", (req, res) => {
  let username = req.session.username;

  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.render("pages/logout", { name: username });
  });
});

app.get("/info", (req, res) => {
  const data = {
    argumentos: JSON.stringify(args),
    directorioActual: process.cwd(),
    idProceso: process.pid,
    vNode: process.version,
    rutaEjecutable: process.execPath,
    sistemaOperativo: process.platform,
    memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
  };

  res.render("pages/info", data);
});

app.get("/api/randoms", (req, res) => {
  res.render("pages/random");
});

app.post("/api/randoms", (req, res) => {
  const cant = req.query.cant || 100000;
  const random = fork("./src/utils/random.js");
  random.send({ message: "start", cant: cant });
  random.on("message", (obj) => {
    res.json(obj);
  });
});

//ruta de servidor Api Rest

// app.all("*", (req, res) => {
//   res.status(404).send("Ruta no encontrada");
// });
