const { Router } = require("express");
const passport = require("passport");

const { loginController } = require("../controller/loginController");

const loginRouter = Router();

loginRouter.get("/", loginController.get);
loginRouter.get("/faillogin", loginController.errorLogin);
loginRouter.post(
  "/",
  // (req, res, next) => {
  //   console.log(req.body);
  //   next();
  // },
  passport.authenticate("login", { failureRedirect: "login/faillogin" }),
  loginController.postLogin
);

module.exports = loginRouter;
