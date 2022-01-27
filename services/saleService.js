const saleModel = require('../models/saleModel');

const serialize = (sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
});

const addSales = async (sales) => {
  const newSaleId = await saleModel.createNewSale();
  sales.map((sale) => serialize(sale))
    .forEach(async (sale) => {
    await saleModel.addSaleProducts({ saleId: newSaleId, ...sale }); 
  });
  return newSaleId;
};

module.exports = {
  addSales,
};