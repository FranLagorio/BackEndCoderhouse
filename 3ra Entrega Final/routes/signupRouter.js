const { Router } = require("express");
const passport = require("passport");
const { upLoad } = require("../middlewares/multerMiddleware");

const { signupController } = require("../controller/signupController");

const signupRouter = Router();

signupRouter.get("/", signupController.get);
signupRouter.get("/failsignup", signupController.errorSignup);
signupRouter.post(
  "/",
  upLoad,
  passport.authenticate("signup", { failureRedirect: "/signup/failsignup" }),
  signupController.postsignup
);

module.exports = signupRouter;
