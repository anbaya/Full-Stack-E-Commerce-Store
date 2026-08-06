const Card = require('./card.module');

// Add to Card
const addToCard = async ({ cartId, productId, quantity, productName, productTotal }) => {
    if (!cartId || !productId || !quantity || !productTotal || !productName) {
        throw new Error("All Cart info is required");
    }

    // Validate and convert numeric values
    const validQuantity = parseInt(quantity);
    const validProductTotal = parseFloat(productTotal);
    if (isNaN(validQuantity) || validQuantity <= 0) {
        throw new Error("Invalid quantity value");
    }
    if (isNaN(validProductTotal) || validProductTotal < 0) {
        throw new Error("Invalid product total value");
    }

    let card = await Card.findById(cartId);
    if (!card) {
        card = await Card.create({ userId: cartId, cardItems: [], totalPrice: 0 });
    }

    const existingItem = card.cardItems.find(
        item => item.productId.toString() === productId
    );

    if (existingItem) {
        // Increment quantity if product already in cart
        existingItem.quantity += validQuantity;
        existingItem.productTotal += validProductTotal;
    } else {
        // Add new product to cart - note: schema uses ProductName (capital P)
        console.log("Adding new item to cart:", {
            productId,
            quantity: validQuantity,
            productTotal: validProductTotal,
            productName
        });
        card.cardItems.push({
            productId,
            quantity: validQuantity,
            ProductName: productName,  // Changed to match schema (capital P)
            productTotal: validProductTotal
        });
        card.totalPrice += validProductTotal;
    }

    await card.save();
    return card;
};

//get card by id
const getCardById = async (cardId) => {
    if (!cardId) {
        throw new Error("Card ID is required");
    }
    const card = await Card.findById(cardId);
    if (!card) {
        throw new Error("Card not found");
    }
    return card;
};

// delete card by id
const deleteCardById = async (cardId) => {
    if (!cardId) {
        throw new Error("Card ID is required");
    }
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
        throw new Error("Card not found");
    }
    return card;
};

module.exports = {
    addToCard,
    getCardById,
    deleteCardById
};