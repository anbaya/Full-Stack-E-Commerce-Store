const User = require('./user.module');
const Card = require('../cards/card.module');
const Address = require('../address/address.module');

const updateUser = async (userId, {name, email, type, address, purchasedProducts, password, card}) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    let newAddress = null;
    if (address) {
        newAddress = await Address.create(address);
        if (!newAddress) {
            throw new Error("Failed to create address");
        }
        await newAddress.save();
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (type) updateData.type = type;
    if (purchasedProducts) updateData.purchasedProducts = purchasedProducts;
    if (password) updateData.password = password;
    if (card) updateData.card = card;
    if (newAddress) updateData.address = newAddress._id;

    await User.findByIdAndUpdate(userId, updateData);
    return await User.findById(userId);
};

module.exports = {
    updateUser,
};