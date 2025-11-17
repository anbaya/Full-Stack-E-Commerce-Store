const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		enum: ['customer', 'admin'],
		default: 'customer'
	},
	email: {
		type: String,
		required: true,
		unique: [true, "invalid email"]
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	card: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Card'
	},
	purchasedProducts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	],
	address: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address'
		}
	]
}, { timestamps: true });

userSchema.pre('save', async function(next){
	if(!this.isModified('password'))
		return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.comparePassword = function(password){
	return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);