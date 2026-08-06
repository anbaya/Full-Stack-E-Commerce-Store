const express = require('express');
const app = express();
const router = require('./routes/index.js');
const path = require("path");
const cors = require("cors");

// Enable CORS for all routes
app.use(cors({
    origin: true, // Allow all origins
    credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'modules/products/productsImages')));

// Use product routes
app.use('/api', router);

module.exports = app;