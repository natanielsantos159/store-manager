const saleService = require('../services/saleService');
const productService = require('../services/productService');

const addSales = async (req, res) => {
  const sales = req.body;

  const promisesArray = sales.map(({ product_id }) => productService.productsExists(product_id));
  const productIdsExists = await Promise.all(promisesArray);

  const someAreInvalid = productIdsExists.some((exists) => !exists);
  if (someAreInvalid) return res.status(404).json({ message: 'Product not found' });

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

const update = async (req, res) => {
  const { id } = req.params;
  const [sale] = req.body;

  const productExists = await productService.getById(sale.product_id);
  if (!productExists) return res.status(404).json({ message: 'Sale not found' });
  await saleService.update({ id, ...sale });

  return res.status(200).json(
    { saleId: id, itemUpdated: [{ id, ...sale }] },
  );
};

module.exports = {
  addSales,
  getAll,
  getById,
  update,
};