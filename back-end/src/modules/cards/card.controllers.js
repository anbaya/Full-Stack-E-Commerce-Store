const Card = require('./card.module');
const services = require('./card.services');

// Add Card
const addCard = async (req, res) => {
	try {
		const card = await Card.create(req.body);
		if (!card) {
			return res.status(400).json({ message: "Invalid card data" });
		}
		res.status(201).json(card);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Get All Cards
const getAllCards = async (req, res) => {
	try {
		const cards = await Card.find();
		res.status(200).json(cards);
	} catch (error) {
		res.status(500).json({ message: "No cards found" });
	}
};

// get Card by ID
const getCardById = async (req, res) => {
	try {
		const { id } = req.params;
		const card = await Card.findById(id);
		if (!card) {
			return res.status(404).json({ message: "Card not found" });
		}
        res.status(200).json(card);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Update Card by ID
const updateCardById = async (req, res) => {
	try {
		const { id } = req.params;
		const card = await Card.findByIdAndUpdate(id, req.body);
		if (!card) {
			return res.status(404).json({ message: "Card not found" });
		}
		const updatedCard = await Card.findById(id);
		res.status(200).json(updatedCard);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// AddToCart
const addToCart = async (req, res) => {
	try {
		const card = await services.addToCard(req.body);
		res.status(200).json({ message: "Product added to cart successfully", card });
	} catch (error) {
		console.error("Add to cart error:", error);
		if (error.message === "Card not found") {
			return res.status(404).json({ message: error.message });
		}
		if (error.message.includes("required")) {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({ message: "Failed to add product to cart" });
	}
};

// delete Card by ID
const deleteCardById = async (req, res) => {
	try {
		const { id } = req.params;
		const card = await services.deleteCardById(id);
		if (!card) {
			return res.status(404).json({ message: "Card not found" });
		}
		res.status(200).json({ message: "Card deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	addCard,
	getAllCards,
	updateCardById,
	addToCart,
	getCardById,
	deleteCardById
};