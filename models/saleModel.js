const connection = require('./connection');

const createNewSale = async () => {
  const [rows] = await connection.execute('INSERT INTO StoreManager.sales VALUES ();');
  return rows.insertId;
};

const addSaleProducts = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?);', 
    [saleId, productId, quantity],
  );
};

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sales.id AS saleId, sales.date, salesproducts.product_id,salesproducts.quantity 
    FROM StoreManager.sales_products AS salesproducts JOIN
      StoreManager.sales AS sales
      ON salesproducts.sale_id = sales.id`,
  );

  return sales;
};

module.exports = { 
  createNewSale,
  addSaleProducts,
  getAll,
};