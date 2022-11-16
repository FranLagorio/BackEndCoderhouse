const { Router } = require("express");
const homeRouter = Router();

const { homeController } = require("../controller/homeController");

homeRouter.get("/", homeController.get);

module.exports = homeRouter;
