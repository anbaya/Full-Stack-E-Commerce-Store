const express = require('express');
const router = express.Router();
const controllers = require('./order.controllers');

// Create Order
router.post('/place-order', controllers.createOrder);

module.exports = router;