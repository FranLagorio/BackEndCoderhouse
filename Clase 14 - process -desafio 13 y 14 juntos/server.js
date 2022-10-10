import { fileURLToPath } from "url";
import { dirname } from "path";
import { createServer } from "http";
import express from "express";
import session from "express-session";
import { Server } from "socket.io";
import { socketController } from "./src/utils/socketController.js";
import {
  homeRouter,
  productRouter,
  loginRouter,
  signupRouter,
  apiRandomsRouter,
  logoutRouter,
  infoRouter,
} from "./routes/index.js";

//////////////////////// VARIABLES DE ENTORNO
import { PORT, MONGOPSW } from "./config.js";

//////////////////////// Login
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import redis from "redis";
import connectRedis from "connect-redis";
import mongoose from "mongoose";
import Usuarios from "./models/usuarioSchema.js";
import { isValidPassword, createHash } from "./src/utils/passwordsFunctions.js";
////////////////////////

//Creacion de Servidor y Sockets
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//////////////////////// CONECCION BASE DE DATOS
mongoose
  .connect(
    `mongodb+srv://franchas123:${MONGOPSW}@cluster0.zqkvn9v.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to Mongo Atlas"));

//////////////////////// CONFIG LOGINS PASSPORT
passport.use(
  //login es el action
  "login",
  // callback, importante respetar username y password
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log("User not found with username " + username);
        return done(null, false);
        //null significa sin error, y false parametro a enviar
      }
      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

//////////////////////// CONFIG signup PASSPORT
passport.use(
  //login es el action
  "signup",
  new LocalStrategy(
    //aca indicas que siempre necesitas password, y pasa todo el request al callback.
    //Por ejemplo si pasaras mas props y no solo username y password
    { passReqToCallback: true },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (error, user) {
        if (error) {
          console.log("Error in SingnUp: " + error);
          return done(error);
        }
        if (user) {
          console.log("User already exists");
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, user) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log("User Registration succesful");
          //con lo siguiente quedas logueado, creas la session
          return done(null, user);
        });
      });
    }
  )
);

//////////////////////// PASSPORT NECESSARY MIDDLEWARES
//passport necesita hacer esto con todas las sesiones, debido a que tiene muchas estrategias, para poder guardar la sesion
passport.serializeUser((user, done) => {
  done(null, user._id);
});
// lo busca en base de datos
passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

//////////////////////// CONFIGURACION REDIS
const client = redis.createClient({ legacyMode: true });
client.connect();
const RedisStore = connectRedis(session);

app.use(
  session({
    store: new RedisStore({ host: "localhost", port: 6379, client, ttl: 300 }),
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 86400000, // 1 dia
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

//////////////////////// MIDDLEWARE ACCESO A CARPETA PUBLIC
app.use(express.static(__dirname + "/public"));

//////////////////////// MOTOR DE PLANTILLA
app.set("view engine", "ejs");
app.set("views", "./views");

//////////////////////// LECTURA FORMATO JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//////////////////////// MIDDLEWARE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//////////////////////// CREACION DE SESION EN MONGO
// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://franchas123:fran123@cluster0.zqkvn9v.mongodb.net/?retryWrites=true&w=majority",
//       mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//     }),
//     secret: "secreto",
//     //MAXIMO 10 MINUTOS
//     cookie: { maxAge: 600000 },
//     resave: false,
//     saveUninitialized: false,
//   })
// );

//////////////////////// REFRESH MAXAGE
app.use((req, res, next) => {
  req.session.touch();
  next();
});

//////////////////////// RUTAS
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/api/products-test", productRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/home", homeRouter);
app.use("/api/randoms", apiRandomsRouter);
app.use("/logout", logoutRouter);
app.use("/info", infoRouter);
////////////////////////

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.send("<h1>Ruta ok!</h1>" + JSON.stringify(user));
});

//////////////////////// SERVIDOR
httpServer.listen(PORT, () =>
  console.log("Servidor Funcionando en Puerto: " + PORT)
);
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));

//////////////////////// SOCKET
socketController(io);

//////////////////////// MANEJO DE ERROR DE REQUEST
app.all("*", (req, res) => {
  res.status(404).send("Ruta no encontrada");
});
