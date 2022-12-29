const { Router } = require("express");
const passport = require("passport");
const homeRouter = Router();

const homeController = require("../controller/homeController");
const { passportJwt } = require("../middlewares/passportMiddleware");

homeRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  homeController.get
);
homeRouter.get("/info", homeController.getInfo);

module.exports = homeRouter;
