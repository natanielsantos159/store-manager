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

const getById = async (id) => {
  const [rows] = await connection.execute( 
    `SELECT sales.date, salesproducts.product_id,salesproducts.quantity 
    FROM StoreManager.sales_products AS salesproducts JOIN
    StoreManager.sales AS sales
    ON salesproducts.sale_id = sales.id
    WHERE salesproducts.sale_id = ?`, 
    [id],
  );
  return rows;
};

const update = async (saleInfo) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ? 
    WHERE sale_id = ? AND product_id = ?`,
    [saleInfo.quantity, saleInfo.id, saleInfo.product_id],
  );
};

module.exports = { 
  createNewSale,
  addSaleProducts,
  getAll,
  getById,
  update,
};