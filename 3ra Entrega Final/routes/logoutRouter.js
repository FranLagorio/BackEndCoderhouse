const { Router } = require("express");

const logoutController = require("../controller/logoutController");

const logoutRouter = Router();

logoutRouter.get("/", logoutController.get);

module.exports = logoutRouter;
