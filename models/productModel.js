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

const getById = async (id) => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?', 
    [id],
  );
  return rows[0];
};

const update = async ({ id, name, quantity }) => {
  try {
    await connection.execute(
      'UPDATE StoreManager.products SET id=?, name=?, quantity=? WHERE id=? ',
      [id, name, quantity, id],
    );
    return { id, name, quantity };
  } catch (err) {
    console.log(err);
  }
};

const deleteById = async (id) => {
  try {
    await connection.execute('DELETE FROM StoreManager.products WHERE id=?', [id]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
};