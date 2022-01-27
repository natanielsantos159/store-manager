const validateProductQuantity = require('./validateProductQuantity');

const validateSaleProductQuantity = (req, res, next) => {
  const sales = req.body;
  const allQuantitiesAreValid = sales.every(({ quantity }) => {
    req.body.quantity = quantity;
    
    let isValid = false;
    validateProductQuantity(req, res, () => { isValid = true; });
    return isValid;
  });
  if (allQuantitiesAreValid) next();
};

module.exports = validateSaleProductQuantity;