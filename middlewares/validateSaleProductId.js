const validateSaleProductId = (req, res, next) => {
  const sales = req.body;
  sales.forEach((sale) => {
    if (!('product_id' in sale)) {
      return res.status(400).json({ message: '"product_id" is required' });        
    }
  });

  next();
};

module.exports = validateSaleProductId;