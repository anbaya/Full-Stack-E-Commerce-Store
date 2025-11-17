const User = require('../users/user.module');
const Product = require('../products/product.module');
const Order = require('../orders/order.module');

// Dashboard General Admin services

async function getDashboardStats() {
	const totalUsers = await User.countDocuments();
	const totalProducts = await Product.countDocuments();
	const totalOrders = await Order.countDocuments();

	return {
		totalUsers,
		totalProducts,
		totalOrders
	};
}

async function getTotalOfSales() {
	const totalSales = await Order.aggregate([
		{$match: {status: 'pending'}},
		{$group: {_id: null, totalSales: {$sum: '$totalPrice'}}}
	]);
	return totalSales[0].totalSales;
}

module.exports = {
	getDashboardStats,
	getTotalOfSales
};
