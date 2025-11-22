const Order = require('./order.module');
const orderServices = require('./order.services');
const mailer = require('../../utils/mailer');

const createOrder = async (req, res) => {
    try {
        const order = await orderServices.createOrder(req.body);
        res.status(201).json(order);
        // Send confirmation email
        await mailer.sendEmail({
            to: req.body.email,
            subject: 'Order Confirmation',
            text: `Thank you for your order! Your order ID is ${order.id}.`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await orderServices.getOrderById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderServices.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try{
        const id = req.params.id;
        const { status } = req.body;
        if (status !== 'pending' && status !== 'shipped' && status !== 'delivered' && status !== 'cancelled') {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        const order = await orderServices.updateOrderStatus(id, status);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Order by ID
const deleteOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await orderServices.deleteOrderById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    deleteOrderById
};