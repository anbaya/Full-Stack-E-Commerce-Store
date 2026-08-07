const express = require('express');
const productRoutes = require('../modules/products/product.routes.js');
const userRoutes = require('../modules/users/user.routes.js');
const cardRoutes = require('../modules/cards/card.routes.js');
const orderRoutes = require('../modules/orders/order.routes.js');
const mailRoutes = require('../utils/mail.routes.js');
const dashboardRoutes = require('../modules/dashboard/dashboard.routes.js');
const addressRoutes = require('../modules/address/address.routes.js');
const health = require('../utils/health.js');

const router = express.Router();

router.use('/store', productRoutes);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/orders', orderRoutes);
router.use('/mail', mailRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/addresses', addressRoutes);
router.get('/health', health);

module.exports = router;
