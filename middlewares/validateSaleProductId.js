const validateSaleProductId = (req, res, next) => {
  const sales = req.body;
  if (!(sales instanceof Array)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  const someInvalid = sales.some((sale) => !('product_id' in sale));
  if (someInvalid) return res.status(400).json({ message: '"product_id" is required' }); 

  next();
};

module.exports = validateSaleProductId;