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

module.exports = {
    createOrder
};