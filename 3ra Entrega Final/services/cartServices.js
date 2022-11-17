const { create, get, post, delet, deleteAllCart } = require("../daos/cartDaos");

const createCart = async (userId) => {
  return await create(userId);
};

const getCart = async (cartId) => {
  return await get(cartId);
};

const saveToCart = async (cartId, product) => {
  return await post(cartId, product);
};

const deleteProdInCart = async (cartId, product) => {
  return await delet(cartId, product);
};

const deleteCart = async (cartId) => {
  return await deleteAllCart(cartId);
};

module.exports = {
  createCart,
  getCart,
  saveToCart,
  deleteProdInCart,
  deleteCart,
};
