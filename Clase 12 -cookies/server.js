const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { Router } = express;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("a secret"));

const router = Router();
app.use("/cookies", router);

/* Server Listen */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`servidor Levantado http://localhost:${PORT}`)
);
server.on("error", (error) => console.log(`Error en servidor ${error}`));

router.post("/", (req, res) => {
  const { key, value, age } = req.body;
  try {
    if (key && value) {
      if (age) {
        res
          .status(200)
          .cookie(key, value, { maxAge: age })
          .send({ proceso: "ok" });
      } else {
        res.status(200).cookie(key, value).send({ proceso: "ok" });
      }
    } else {
      res.status(400).send({ error: "falta nombre ó valor" });
    }
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.get("/", (req, res) => {
  try {
    res.status(200).send(req.cookies);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.delete("/:key", (req, res) => {
  const { key } = req.params;
  try {
    if (key) {
      res.status(200).clearCookie(key).send({ proceso: "ok" });
    } else {
      res.status(200).send({ error: "falta nombre" });
    }
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/login", (req, res) => {
  const { user, pas } = req.query;
  if (user !== "pepe" || pas !== "asdasd") {
    return res.send("login failed");
  } else {
    req.session.user = user;
    req.session.admin = true;
    return res.send("login success");
  }
});

app.get("/test", (req, res) => {
  console.log(req.session.user);
  console.log(req.session.admin);
  return res.send(req.session);
});

// app.use(cookieParser("el secreto"));

// app.get("/crearcookie", (req, res) => {
//   return res
//     .cookie("nombre", "guille", { signed: true, httpOnly: true })
//     .send("<h1>GUARDAMOS TU COKIE</h1>");
// });

// app.get("/recuperarcookie", (req, res) => {
//   console.log("///////////////////////////////");
//   console.log(req.cookies);
//   console.log(req.signedCookies);
//   return res.send("<h1>mira la consola para ver si hay cookies</h1>");
// });
