express = require('express');
const addressControllers = require('./address.controllers');

const router = express.Router();

router.post('/', addressControllers.createAddressController);
router.get('/:id', addressControllers.getAddressByIdController);
router.put('/:id', addressControllers.updateAddressController);
router.delete('/:id', addressControllers.deleteAddressController);

module.exports = router;