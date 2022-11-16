const homeRouter = require("./homeRouter");
const loginRouter = require("./loginRouter");
const logoutRouter = require("./logoutRouter");
const signupRouter = require("./signupRouter");
const infoRouter = require("./infoRouter");

const Router = (app) => {
  app.use((req, res, next) => {
    logger.info({ URL: req.originalUrl, method: req.method });
    next();
  });

  app.get("/", (req, res) => {
    res.redirect("/login");
  });

  app.use("/login", loginRouter);
  app.use("/signup", signupRouter);
  app.use("/home", homeRouter);
  app.use("/logout", logoutRouter);
  app.use("/info", infoRouter);

  app.all("*", (req, res) => {
    logger.warn({ URL: req.originalUrl, method: req.method });
    res.status(404).end();
  });
};

module.exports = Router;

const { logger } = require("../src/utils/loggers");
