const AddressSrevices = require('./address.services');

async function createAddressController(req, res) {
    try {
        const address = await AddressSrevices.createAddress(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAddressByIdController(req, res) {
    try {
        const address = await AddressSrevices.getAddressById(req.params.id);
        res.status(200).json(address);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function updateAddressController(req, res) {
    try {
        const address = await AddressSrevices.updateAddress(req.params.id, req.body);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteAddressController(req, res) {
    try {
        const address = await AddressSrevices.deleteAddress(req.params.id);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createAddressController,
    getAddressByIdController,
    updateAddressController,
    deleteAddressController
};