const logoutController = {
  get: (req, res) => {
    if (req.isAuthenticated()) {
      const name = req.user.name;
      req.logout((error) => {
        if (error) {
          res.json(error);
        }
        res.render("pages/logout", { name: name });
      });
    } else {
      res.redirect("/login");
    }
  },
};

module.exports = logoutController;
