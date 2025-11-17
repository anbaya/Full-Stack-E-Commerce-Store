const express = require('express');
const router = express.Router();
const controllers = require('./users.controllers');

// Add User
router.post('/register', controllers.addUser);

// Login User
router.post('/login', controllers.userLogin);

// Get All Users
router.get('/', controllers.getAllUsers);

// Update User by ID
router.put('/:id', controllers.updatedUserById);

module.exports = router;