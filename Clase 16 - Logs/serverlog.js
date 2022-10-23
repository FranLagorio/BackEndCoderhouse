const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;
//LOG4JS
const log4js = require("log4js");
log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerFile: { type: "file", filename: "info.log" },
    miLoggerFile2: { type: "file", filename: "info2.log" },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "trace" },
    consola: { appenders: ["miLoggerFile2"], level: "debug" },
    archivo: { appenders: ["miLoggerFile"], level: "warn" },
    archivo2: { appenders: ["miLoggerFile2"], level: "info" },
    todos: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "trace" },
  },
});

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

const logger1 = log4js.getLogger("todos");
const logger2 = log4js.getLogger("consola");

app.get("/sumar", (req, res) => {
  const { num1, num2 } = req.query;
  const suma = (a, b) => {
    return parseInt(a) + parseInt(b);
  };

  logger1.trace("Entering cheese testing");
  logger1.debug("Got cheese.");
  logger1.info("Cheese is Comté.");
  logger1.warn("Cheese is quite smelly.");
  logger1.error("Cheese is too ripe!");
  logger1.fatal("Cheese was breeding ground for listeria.");

  res.json(suma(num1, num2));
});

app.get("/resta", (req, res) => {
  logger2.trace("Entering cheese testing");
  logger2.debug("aaaa");
  logger2.info("bbbb");
  logger2.warn("ccc.");
  logger2.error("ddd");
  logger2.fatal("ee");
  res.json("resta");
});
