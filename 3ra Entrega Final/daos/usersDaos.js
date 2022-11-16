const Users = require("../models/userSchema");

const userManager = {
  findUser: async function (username) {
    try {
      let user = await Users.findOne({ username: req.user.username });
      return user;
    } catch {}
  },
};
