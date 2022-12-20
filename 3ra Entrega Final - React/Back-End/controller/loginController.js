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
      res.send(req.user);
    } catch (error) {
      errorLogger.error(urlMethodError(req));
      return res.status(500).send({ status: "Log In error", body: error });
    }
  },

  errorLogin: (req, res) => {
    try {
      res.status(200).render("pages/failLogin");
    } catch (error) {
      errorLogger.error(urlMethodError(req));
      res.status(500).send({ status: "Log In error", body: error });
    }
  },
};

module.exports = { loginController };
