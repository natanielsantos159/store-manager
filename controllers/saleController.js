const saleService = require('../services/saleService');
const productService = require('../services/productService');

const addSales = async (req, res) => {
  const sales = req.body;

  const validIds = sales.every(async ({ product_id }) => {
    const result = await productService.productsExists(product_id);
    return result;
  });
  if (!validIds) res.status(404).json({ message: 'Product not found' });

  const addedSaleId = await saleService.addSales(sales);
  res.status(201).json({ id: addedSaleId, itemsSold: sales });
};

module.exports = {
  addSales,
};