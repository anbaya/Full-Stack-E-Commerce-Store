const ORDER_URL = '/api/orders/place-order';
const CART_URL = '/api/cards';
const PRODUCTS_API_URL = '/api/store/products';
const USER_URL = '/api/users';
const TOKEN = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

async function getUserData(token) {
    try {
        const response = await axios.get(`${USER_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function getProductData(productId) {
    try {
        const response = await axios.get(`${PRODUCTS_API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return null;
    }
}

async function getCartData(id) {
    try {
        const response = await axios.get(`${CART_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
}

function prepareOrderData(card, user, data) {
    if (!card || !user) return null;
    const orderData = {
        user: user._id,  // Changed from userId to user to match backend
        products: card.cardItems,
        totalPrice: card.totalPrice || card.cardItems.reduce((sum, item) => sum + (item.productTotal || 0), 0),
        address: user.address,
        shipping: data.shippingMethod
    };
    return orderData;
}

const orderForm = document.getElementById('order-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const shippingMethod = document.getElementById('shipping-method').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const user = await getUserData(TOKEN);
    if (!user) {
        alert('User not authenticated. Please log in.');
        return;
    }
    const cart = await getCartData(user.card);
    if (!cart) {
        alert('Could not retrieve cart data.');
        return;
    }
    const orderData = prepareOrderData(cart, user, { shippingMethod, paymentMethod });
    if (!orderData) {
        alert('Failed to prepare order data.');
        return;
    }
    try {
        const response = await axios.post(ORDER_URL, orderData, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        user.orders.push(response.data._id);
        try {
            await axios.put(`${USER_URL}/${user._id}`, { orders: user.orders }, {
                headers: { 'Authorization': `Bearer ${TOKEN}` }
            });
        } catch (error) {
            console.error('Error updating user orders:', error);
        }
        alert('Order placed successfully!');
        await axios.delete(`${CART_URL}/${cart._id}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        window.location.href = 'home.html';
        return;
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
    }
});

async function initializeOrderPage() {
    const user = await getUserData(TOKEN);
    if (!user) {
        alert('User not authenticated. Please log in.');
        return;
    }
    const cart = await getCartData(user.card);
    if (!cart) {
        return;
    }
    if (!cart.cardItems || cart.cardItems.length === 0) {
        document.getElementById('cart-items').innerHTML = '<li>Your cart is empty</li>';
        document.getElementById('total-amount').textContent = '0.00';
        return;
    }
    document.getElementById('total-amount').textContent = cart.totalPrice ? cart.totalPrice.toFixed(2) : '0.00';
    document.getElementById('cart-items').innerHTML = cart.cardItems.map(item => {
        // Check what data is available for each item
        // Use ProductName if available, otherwise use productId
        const productName = item.ProductName || item.productName || `Product ${item.productId}`;
        // Use productTotal if available, otherwise try to calculate or show as unavailable
        const itemTotal = item.productTotal || 'Price unavailable';
        return `<li>${productName} - Quantity: ${item.quantity} - Price: $${typeof itemTotal === 'number' ? itemTotal.toFixed(2) : itemTotal}</li>`;
    }).join('');
}
document.getElementById('clear-cart-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to clear the cart?')) {
        return;
    }
        if (card) {
            const user = await getUserData(TOKEN);
            if (!user) {
                alert('User not authenticated. Please log in.');
                return;
            }
            await axios.delete(`${CART_URL}/${user.card}`, {
                headers: { 'Authorization': `Bearer ${TOKEN}` }
            });
        }
    alert('Cart cleared successfully!');
    window.location.reload();
});

window.addEventListener('DOMContentLoaded', initializeOrderPage);