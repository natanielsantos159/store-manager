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

const getAll = async (req, res) => {
  const sales = await saleService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).json({ message: 'Sale not found' });

  const sale = await saleService.getById(id);
  if (sale && sale.length) return res.status(200).json(sale);

  return res.status(404).json({ message: 'Sale not found' });
};

module.exports = {
  addSales,
  getAll,
  getById,
};