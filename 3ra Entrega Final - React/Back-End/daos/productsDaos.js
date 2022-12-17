const { Products } = require("../models/productSchema");

const getAll = async () => {
  try {
    return await Products.find({});
  } catch (error) {
    throw Error(error);
  }
};

const getById = async (id) => {
  try {
    return await Products.findById(id);
  } catch (error) {
    throw Error(error);
  }
};

const save = async (product) => {
  try {
    await Products.create(product);
    return;
  } catch (error) {
    throw new Error(error);
  }
};

const delet = async (id) => {
  try {
    await Products.findByIdAndDelete(id);
    return id;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, newBody) => {
  try {
    await Products.findByIdAndUpdate(id, newBody);
    return await getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getAll, getById, save, delet, update };
