const Card = require('./card.module');

// Add to Card
const addToCard = async ({ cartId, productId }) => {
    if (!cartId || !productId) {
        throw new Error("Cart ID and Product ID are required");
    }

    const card = await Card.findById(cartId);
    if (!card) {
        throw new Error("Card not found");
    }

    // Check if product already exists in cart
    // const existingItem = card.cardItems.find(
    //     item => item.productId.toString() === productId
    // );

    // if (existingItem) {
    //     // Increment quantity if product already in cart
    //     existingItem.quantity += 1;
    // } else {
    //     // Add new product to cart with quantity 1
        card.cardItems.push({ productId, quantity: 1 });
    // }

    await card.save();
    return card;
};

module.exports = {
    addToCard
};