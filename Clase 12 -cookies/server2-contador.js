const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("a secret"));

/* Server Listen */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`servidor Levantado http://localhost:${PORT}`)
);
server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/root/:name", (req, res) => {
  let { name } = req.params;
  if (!req.session[name]) {
    req.session[name] = {};
    req.session[name].name = name;
    req.session[name].cantidadDeLogins = 1;
  } else {
    req.session[name].cantidadDeLogins += 1;
  }
  res.send(
    `<h1>Te damos la bienvenida ${name}</h1>. Visitaste ${req.session[name].cantidadDeLogins} veces`
  );
});

app.get("/olvidar", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout ok!");
  });
});
