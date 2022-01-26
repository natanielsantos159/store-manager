const validateProductQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const quantityNum = Number(quantity);
  if (quantity === undefined || quantity === null) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (Number.isNaN(quantityNum) || quantityNum < 1) {
    return res.status(422).json({
      message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = validateProductQuantity;