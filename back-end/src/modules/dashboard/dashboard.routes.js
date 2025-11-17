const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboard.controllers');

// Get Dashboard Stats
router.get('/stats', dashboardController.getDashboardData);

// Get All Orders - Admin
router.get('/orders', dashboardController.getAllOrders);

// Get Total Sales
router.get('/total-sales', dashboardController.getTotalOfSales);

module.exports = router;