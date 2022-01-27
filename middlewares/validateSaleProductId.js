const validateSaleProductId = (req, res, next) => {  
  if (!('product_id' in req.body)) {
    return res.status(404).json({ message: '"product_id" is required' });        
  }

  next();
};

module.exports = validateSaleProductId;