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

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const update = async ({ id, name, quantity }) => {
  const updatedProduct = await productModel.update({ id, name, quantity });
  return updatedProduct;
};

const deleteById = async (id) => {
  const deleted = await productModel.deleteById(id);
  return deleted;
};

const productsExists = async (id) => {
  const foundProduct = await productModel.getById(id);
  return !!foundProduct; // foundProduct ? true : false
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  deleteById,
  productsExists,
};