const { Router } = require("express");
const homeRouter = Router();

const homeController = require("../controller/homeController");

homeRouter.get("/", homeController.get);
homeRouter.get("/info", homeController.getInfo);

module.exports = homeRouter;
