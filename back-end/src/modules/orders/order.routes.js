const express = require('express');
const router = express.Router();
const controllers = require('./order.controllers');

// Create Order
router.post('/place-order', controllers.createOrder);
// Get All Orders
router.get('/all', controllers.getAllOrders);
// Get Order by ID
router.get('/:id', controllers.getOrderById);
// update Order Status
router.put('/update-status/:id', controllers.updateOrderStatus);
// Delete Order
router.delete('/:id', controllers.deleteOrderById);

module.exports = router;