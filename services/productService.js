const productModel = require('../models/productModel');

const create = async (newProduct) => {
  const products = await productModel.getAll();
  const alreadyExists = products.some(({ name }) => name === newProduct.name);
  if (alreadyExists) throw new Error('Product already exists');

  const createdProduct = await productModel.create(newProduct);

  return createdProduct;
};

const getById = async (id) => {
  const foundProduct = await productModel.getById(id);
  return foundProduct;
};

module.exports = {
  create,
  getById,
};