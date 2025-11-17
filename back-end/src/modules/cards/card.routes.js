const express = require('express');
const router = express.Router();
const Card = require('./card.module');
const controllers = require('./card.controllers');

// Add Card

router.post('/', controllers.addCard);

// Get All Cards
router.get('/', controllers.getAllCards);
// Update Card by ID
router.put('/:id', controllers.updateCardById);

// AddToCart
router.post('/add-to-cart', controllers.addToCart);

module.exports = router;