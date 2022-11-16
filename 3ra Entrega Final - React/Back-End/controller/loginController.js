const { errorLogger } = require("../src/utils/loggers");

const loginController = {
  get: (req, res) => {
    try {
      console.log(req.isAuthenticated());
      if (req.isAuthenticated()) {
        // res.redirect("/home");
        res.status(200).send({ authenticated: true });
      } else {
        res.status(200).send({ authenticated: false });
      }
    } catch (error) {
      errorLogger.error({
        URL: req.originalUrl,
        method: req.method,
        error: error.message,
      });
      return res
        .status(500)
        .send({ status: "Get page Log In error", body: error });
    }
  },
  postLogin: (req, res, next) => {
    try {
      const { username } = req.body.username;

      req.session.username = username;

      res
        .status(200)
        .send({ username: req.body.username, gustos: ["futbol", "fifa"] });
    } catch (error) {
      errorLogger.error({
        URL: req.originalUrl,
        method: req.method,
        error: error.message,
      });
      return res.status(500).send({ status: "Log In error", body: error });
    }
  },

  errorLogin: (req, res) => {
    try {
      res.status(200).render("pages/errorLogin");
    } catch (error) {
      errorLogger.error({
        URL: req.originalUrl,
        method: req.method,
        error: error.message,
      });
      res.status(500).send({ status: "Log In error", body: error });
    }
  },
};

module.exports = { loginController };
