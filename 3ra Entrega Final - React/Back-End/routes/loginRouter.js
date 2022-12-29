const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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

  //ESTO FUNCIONABA SIN JWT
  // passport.authenticate("login", { failureRedirect: "login/faillogin" }),

  //CON JWT
  // (req, res, next) => {
  //   passport.authenticate("login", (err, user, info) => {
  //     try {
  //       if (err || !user) {
  //         // const error = new Error("new Error");
  //         // return next(error);
  //         return res.redirect("login/faillogin");
  //       }
  //       req.login(user, { session: false }, (err) => {
  //         if (err) return next(err);
  //         const body = { _id: user._id, email: user.username };
  //         const token = jwt.sign({ user: body }, "top_secret");
  //         // return res.json({ token });
  //         return next();
  //       });
  //     } catch (error) {
  //       return next(error);
  //     }
  //   })(req, res, next);
  // },
  loginController.tokenLogin,
  loginController.postLogin
);

module.exports = loginRouter;
