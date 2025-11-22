const Address = require('./address.module');

async function createAddress(addressData) {
    const address = new Address(addressData);
    if (!addressData) {
        throw new Error("Address data is required");
    }
    return await address.save();
}

async function getAddressById(addressId) {
    address = await Address.findById(addressId);
    if (!addressId) {
        throw new Error("Address ID is required");
    }
    return address;
}

async function updateAddress(addressId, updateData) {
    address = await Address.findByIdAndUpdate(addressId, updateData, { new: true });
    if (!addressId) {
        throw new Error("Address ID is required");
    }
    return address;
}

async function deleteAddress(addressId) {
    address = await Address.findByIdAndDelete(addressId);
    if (!addressId) {
        throw new Error("Address ID is required");
    }
    return address;
}

module.exports = {
    createAddress,
    getAddressById,
    updateAddress,
    deleteAddress
};