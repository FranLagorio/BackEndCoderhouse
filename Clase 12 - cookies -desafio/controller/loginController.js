export const loginController = {
  auth: (req, res, next) => {
    if (req.session?.user === "fran" && req.session?.admin) {
      return next();
    }
    return res.status(401).render("pages/errorLogin");
  },
  get: (req, res) => {
    try {
      res.render("pages/login");
    } catch (error) {
      return res
        .status(500)
        .send({ status: "Get page Log In error", body: err });
    }
  },
  postLogin: (req, res) => {
    try {
      const { username, password } = req.body;
      if (username !== "fran" || password !== "123") {
        return res.render("pages/errorLogin");
      }
      req.session.user = username;
      req.session.admin = true;
      var time = 600000;
      // req.session.cookie.expires = new Date(Date.now() + time);
      req.session.cookie.maxAge = new Date(Date.now() + time);

      res.redirect("/home");
    } catch (error) {
      return res.status(500).send({ status: "Log In error", body: err });
    }
  },
};
