const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	street: {
		type: String,
		required: [true, "Street address is required"]
	},
	city: {
		type: String,
		required: [true, "City is required"]
	},
	state: {
		type: String,
		required: [true, "State is required"]
	},
	zip: {
		type: String,
		required: [true, "ZIP code is required"]
	},
	country: {
		type: String,
		required: [true, "Country is required"]
	},
	phoneNumber: {
		type: String,
		required: [true, "Phone number is required"]
	}
},
{
	timestamps: true
}
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;