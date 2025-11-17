const jwt = require('jsonwebtoken');
const User = require('../modules/users/user.module');
const Card = require('../modules/cards/card.module');
const Section = require('../modules/sections/section.module');
const config = require('dotenv');


const register = async ({email, name, password}) => {
	// Input validation
	if (!email || !name || !password) {
		throw new Error("Email, name, and password are required");
	}

	const existingUser = await User.findOne({email});
	if (existingUser) throw new Error("user already exist");

	const user = await User.create({name, email, password});
	const card = await Card.create({ userId: user._id });
	user.card = card._id;
	await user.save();
	return user;
}

const login = async ({email, password}) => {
	// Input validation
	if (!email || !password) {
		throw new Error("Email and password are required");
	}
	const user = await User.findOne({email}).select('+password');
	if (!user) throw new Error("invalid email or password");

	const isMatch = await user.comparePassword(password);
	if (!isMatch) throw new Error("invalid password or email");

	const token = jwt.sign({id: user.id}, 'supersecret', {expiresIn: '1d'});
	const section = await Section.create({ userId: user._id, token });

	return section;
}

module.exports = {
	register,
	login
}