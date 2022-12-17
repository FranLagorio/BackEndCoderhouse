const { Carts } = require("../models/cartSchema");
const Users = require("../models/userSchema");

const create = async (userId) => {
  try {
    let newCart = await Carts.create({ user_id: userId });
    return newCart.id;
  } catch (error) {
    throw Error(error);
  }
};

const get = async (cartId) => {
  try {
    return Carts.findOne({ _id: cartId });
  } catch (error) {
    throw Error(error);
  }
};

const post = async (cartId, product) => {
  let cart = await Carts.findByIdAndUpdate(
    { _id: cartId },
    { $addToSet: { products: product } }
  );

  return;
};

const delet = async (cartId, product) => {
  let cart = await Carts.findOne({ _id: cartId });

  let prods = cart.products;
  let prodsfiltered = prods.filter((element) => element.name != product.name);

  let newCart = await Carts.findByIdAndUpdate(
    { _id: cartId },
    { products: prodsfiltered }
  );

  return await Carts.findOne({ _id: cartId });
};

const deleteAllCart = async (cartId) => {
  await Carts.findByIdAndUpdate({ _id: cartId }, { products: [] });

  await Users.findOneAndUpdate({ cart_id: cartId }, { $unset: { cart_id: 1 } });
  return;
};

module.exports = { create, get, post, delet, deleteAllCart };
