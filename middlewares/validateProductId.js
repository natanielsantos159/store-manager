const validateProductId = (req, res, next) => {
  const { id } = req.params || req.body;
  const numId = Number(id);
  
  if (!numId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  req.id = numId;
  next();
};

module.exports = validateProductId;