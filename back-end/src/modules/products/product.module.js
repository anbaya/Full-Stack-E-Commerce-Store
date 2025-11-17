const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required:[true, "please add a name"]
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		default: "description missing"
	},
	stock: {
		type: Number,
		required: true,
		default: 10
	},
	category: {
		type: String,
		required: true,
		default: "category missing"
	},
	images: {
		type: [String],
		required: true
	}
},{
	timestamps: true
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;