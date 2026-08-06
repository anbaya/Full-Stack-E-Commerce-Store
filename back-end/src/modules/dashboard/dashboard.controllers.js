const dashboardservices = require('./dashboard.services');
const orderServices = require('../orders/order.services');

// Get Dashboard Data
const getDashboardData = async (req, res) => {
	try {
		const data = await dashboardservices.getDashboardStats();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get All Orders - Admin
const getAllOrders = async (req, res) => {
	try {
		const orders = await orderServices.getAllOrders();
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get Total Sales
const getTotalOfSales = async (req, res) => {
	try {
		const totalSales = await dashboardservices.getTotalOfSales();
		res.status(200).json({ totalSales });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getDashboardData,
	getAllOrders,
	getTotalOfSales
};