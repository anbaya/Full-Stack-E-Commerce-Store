const express = require('express');
const router = express.Router();
const mailController = require('./mail.controllers');

router.post('/send-email', mailController.emailSend);

module.exports = router;
