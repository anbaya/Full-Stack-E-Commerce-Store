const express = require('express');
const router = express.Router();
const Product = require('./product.module');
const controllers = require('./product.controllers');
const upload = require('./Product.multer');

// Add Product
router.post('/products', upload.array("images", 5), controllers.addProduct);

// Get All Products
router.get('/products', controllers.getAllProducts);

// Get Product by ID
router.get('/products/:id', controllers.getProductById);

// Search Products by Name
router.get('/products/search', controllers.searchProductsByName);

// Update Product by ID
router.put('/products/:id', controllers.updateProductById);

// Delete Product by ID
router.delete('/products/:id', controllers.deleteProductById);

module.exports = router;