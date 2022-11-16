const express = require("express");

const { sessionMiddleware } = require("./middlewares/sessionMiddleware");
const { viewEngineMiddleware } = require("./middlewares/viewEngineMiddleware");

const { PORT } = require("./src/config/config");
const { connectMongoDB } = require("./daos/connectMongo");
const Router = require("./routes/Router");

const app = express();

connectMongoDB();
viewEngineMiddleware(app, express);
sessionMiddleware(app);

Router(app);

app.listen(PORT, () => {
  console.log("Servidor Funcionando en Puerto: " + PORT);
});
app.on("error", (error) => console.log(`Error en servidor ${error}`));
