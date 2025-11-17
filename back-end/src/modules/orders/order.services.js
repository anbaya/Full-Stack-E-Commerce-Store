const Order = require ('./order.module');

const createOrder = async ({userId, products, totalPrice, address, shipping}) => {
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

// Orders Admin services

async function getAllOrders() {
	const orders = await Order.find();
	if (orders) {
		return orders;
	}
	throw new Error('No orders found');
}

module.exports = {
    createOrder,
    getAllOrders
};