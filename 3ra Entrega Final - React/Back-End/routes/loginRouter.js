const { Router } = require("express");
const passport = require("passport");

const React = require("react");
const ReactDomServer = require("react-dom/server");

const loginRouter = Router();
const { loginController } = require("../controller/loginController");

const { FRONTEND_SERVER } = require("../config");

loginRouter.get("/login", loginController.get);
loginRouter.get("/login/faillogin", loginController.errorLogin);

// loginRouter.post(
//   "/login",
//   passport.authenticate("login", { failureRedirect: "/login/faillogin" }),
//   loginController.postLogin
// );

loginRouter.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("login", (err, user) => {
      if (user) {
        next();
      } else {
        //res.redirect(`${FRONTEND_SERVER}/register`);
        res.status(200).send({ validator: false }).end();
      }
    })(req, res, next);
  },
  loginController.postLogin
);

//export default loginRouter;
module.exports = loginRouter;
