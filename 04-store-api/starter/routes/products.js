const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Import controller functions
const {
  getAllProducts,
  getAllProductsStatic,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products'); // Make sure the file name is correct!

// Routes
router.get('/static', getAllProductsStatic);
router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getSingleProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
