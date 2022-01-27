require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const validateProductName = require('./middlewares/validateProductName');
const validateProductQuantity = require('./middlewares/validateProductQuantity');
const validateProductId = require('./middlewares/validateProductId');
const validateSaleProductId = require('./middlewares/validateSaleProductId');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProductName, validateProductQuantity, productController.create);

app.get('/products', productController.getAll);

app.get('/products/:id', validateProductId, productController.getById);

app.put('/products/:id', 
  validateProductId, 
  validateProductName, 
  validateProductQuantity, 
  productController.update);

app.delete('/products/:id', validateProductId, productController.deleteById);

app.post('/sales/:id', validateSaleProductId, validateProductQuantity, saleController.addSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
