const { update } = require("../daos/usersDaos");

const userUpdate = async (userId, cartId) => {
  return await update(userId, cartId);
};

module.exports = { userUpdate };
