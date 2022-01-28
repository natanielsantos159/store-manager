const connection = require('./connection');

const createNewSale = async () => {
  const [rows] = await connection.execute('INSERT INTO StoreManager.sales VALUES ();');
  return rows.insertId;
};

const addSaleProducts = async ({ saleId, productId, quantity }) => {
  console.log(saleId, productId, quantity)
  await connection.execute(
    'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?);', 
    [saleId, productId, quantity],
  );
};

module.exports = { 
  createNewSale,
  addSaleProducts,
};