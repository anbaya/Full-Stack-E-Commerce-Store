const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
	cardItems: [
		{
			productId: {
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
