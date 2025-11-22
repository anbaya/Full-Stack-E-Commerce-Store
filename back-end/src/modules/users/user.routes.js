const express = require('express');
const router = express.Router();
const controllers = require('./users.controllers');

// Add User
router.post('/register', controllers.addUser);

// Login User
router.post('/login', controllers.userLogin);

// Get current user
router.get('/me', controllers.Me);

// Get All Users
router.get('/', controllers.getAllUsers);

// Update User by ID
router.put('/:id', controllers.updatedUserById);

// get user by id
router.get('/:id', controllers.getUserById);

module.exports = router;