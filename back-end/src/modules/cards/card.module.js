const mongoose = require('mongoose');
const Product = require('../products/product.module');

const cardSchema = new mongoose.Schema({
	cardItems: [
		{
			ProductName: {
				type: String,
				required: true
			},
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			quantity: {
				type: Number,
				required: true,
				default: 1
			},
			productTotal: {
				type: Number,
				required: true
			}
		}
	],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	totalPrice: {
		type: Number,
		required: true,
		default: 0
	}
},
{
	timestamps: true
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
