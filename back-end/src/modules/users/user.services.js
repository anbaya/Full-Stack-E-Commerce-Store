const User = require('./user.module');
const Card = require('../cards/card.module');
const Address = require('../address/address.module');

const updateUser = async (userId, {firstName, LastName, username, email, type, address, orders, password, card}) => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (LastName) updateData.LastName = LastName;
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (type) updateData.type = type;
    if (orders) updateData.orders = orders;
    if (password) updateData.password = password;
    if (card) updateData.card = card;
    if (address) updateData.address = address;

    await User.findByIdAndUpdate(userId, updateData);
    return await User.findById(userId);
};

// get user by id
const getUserById = async (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const user = await User.findById(userId)
            .populate('address')  // This populates the address array
            .populate('card')     // This populates the card reference
            .populate('orders'); // You might also want to populate purchased products
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        // Handle MongoDB ObjectId cast errors
        if (error.name === 'CastError') {
            throw new Error("Invalid user ID format");
        }
        throw new Error("Error fetching user: " + error.message);
    }
}

module.exports = {
    updateUser,
    getUserById,
};