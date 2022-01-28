const saleModel = require('../models/saleModel');

const serialize = (sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
});

const addSales = async (sales) => {
  const newSaleId = await saleModel.createNewSale();
  const serializedSales = sales.map(serialize);

  const promisesArray = serializedSales
    .map((sale) => saleModel.addSaleProducts({ saleId: newSaleId, ...sale }));

  await Promise.all(promisesArray); // aguarda todas as sales serem adicionadas
  return newSaleId;
};

const getAll = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);
  return sale;
};

module.exports = {
  addSales,
  getAll,
  getById,
};