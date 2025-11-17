const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			quantity: {
				type: Number,
				required: true,
				default: 1
			}
		}
	],
	totalPrice: {
		type: Number,
		required: true
	},
	address: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address',
			required: [true, "Address is required"]
		}
	],
	shipping:{
		type: String,
		required: [true, "Shipping method is required"]
	},
	status: {
		type: String,
		enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
		default: 'pending'
	}
},
{
	timestamps: true
}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;