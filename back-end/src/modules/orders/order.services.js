const Order = require ('./order.module');

const createOrder = async ({userId, products, totalPrice, address, shipping}) => {
    console.log(userId, products, totalPrice, address, shipping);
    if (!userId || !products || !totalPrice || !address || !shipping) {
        throw new Error("All order details are required");
    }
    const orderData = {
        user: userId,
        products,
        totalPrice,
        address,
        shipping
    };
    const newOrder = await Order.create(orderData);
    await newOrder.save();
    for (const item of products) {
        if (!item.quantity || item.quantity <= 0 || item.quantity > item.product.quantity) {
            await Order.findByIdAndDelete(newOrder._id);
            throw new Error("Invalid product quantity or out of stock");
        }
    }
    return newOrder;
}

// get order by ID
const getOrderById = async (orderId) => {
    if (!orderId) {
        throw new Error("Order ID is required");
    }
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    return order;
};


// Orders Admin services

async function getAllOrders() {
	const orders = await Order.find();
	if (orders) {
		return orders;
	}
	throw new Error('No orders found');
}

// update Order status
async function updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    order.status = status;
    await order.save();
    return order;
}

// delete Order by ID
async function deleteOrderById(orderId) {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    await Order.findByIdAndDelete(orderId);
    return order;
}

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    deleteOrderById
};