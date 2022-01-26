const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const create = async ({ name, quantity }) => {
  try {
    const [rows] = await connection.execute(
      'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
      [name, quantity],
    );
    return { id: rows.insertId, name, quantity };
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAll,
  create,
};