require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const productController = require('./controllers/productController');
const validateProductName = require('./middlewares/validateProductName');
const validateProductQuantity = require('./middlewares/validateProductQuantity');
const validateProductId = require('./middlewares/validateProductId');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProductName, validateProductQuantity, productController.create);

app.get('/products', productController.getAll);

app.get('/products/:id', validateProductId, productController.getById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
