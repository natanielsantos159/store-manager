const productService = require('../services/ProductService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productService.createProduct({ name, quantity });
    res.status(201).json(newProduct);
  } catch (e) {

  }
};

module.expors = {
  createProduct,
};