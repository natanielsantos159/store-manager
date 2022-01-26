const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productService.create({ name, quantity: Number(quantity) });
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.message === 'Product already exists') {
      return res.status(409).json({ message: err.message });
    }
    res.status(400).send(err);
  }
};

module.exports = {
  create,
};