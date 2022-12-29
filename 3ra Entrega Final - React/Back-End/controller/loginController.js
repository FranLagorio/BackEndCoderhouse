const passport = require("passport");
const jwt = require("jsonwebtoken");
const { errorLogger, urlMethodError } = require("../src/utils/loggers");

const loginController = {
  get: (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.redirect("/home");
      } else {
        res.status(200).render("pages/login");
      }
    } catch (error) {
      errorLogger.error(urlMethodError(req));
      return res
        .status(500)
        .send({ status: "Get page Log In error", body: error });
    }
  },
  postLogin: (req, res) => {
    try {
      const { username } = req.user;
      req.session.username = username;

      // res.status(200).send(user);
      // res.status(200).send({ username });
      res.redirect("/home");
    } catch (error) {
      errorLogger.error(urlMethodError(req));
      return res.status(500).send({ status: "Log In error", body: error });
    }
  },

  errorLogin: (req, res) => {
    try {
      res.status(404).send("User not found");
      // res.status(404).send("User not found");
    } catch (error) {
      errorLogger.error(urlMethodError(req));
      res.status(500).send({ status: "Log In error", body: error });
    }
  },

  tokenLogin: (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      try {
        if (err || !user) {
          // const error = new Error("new Error");
          // return next(error);
          return res.redirect("login/faillogin");
        }
        req.login(user, { session: false }, (err) => {
          if (err) return next(err);
          const body = {
            _id: user._id,
            email: user.username,
            password: user.password,
          };
          const token = jwt.sign({ user: body }, "top_secret");
          console.log(token);
          return res.send({ token });
          //aca freno y mando al front
          //return next();
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
};

module.exports = { loginController };
