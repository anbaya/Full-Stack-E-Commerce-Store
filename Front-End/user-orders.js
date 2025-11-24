const USR_URL = "http://52.90.2.111:3000/api/users";
const ORDERS_URL = "http://52.90.2.111:3000/api/orders";
const Address_URL = "http://52.90.2.111:3000/api/addresses";
const TOKEN = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

async function fetchUserData() {
    try {
        const response = await axios.get(`${USR_URL}/me`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const user = response.data;
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}
async function fetchOrderById(id) {
    try {
        const response = await axios.get(`${ORDERS_URL}/${id}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const order = response.data;
        return order;
    } catch (error) {
        console.error("Error fetching order data:", error);
        return null;
    }
}

window.onload =  async () => {
    const user = await fetchUserData();
    console.log("User data:", user);
    if (user) {
        const orders = [];
        for (const orderId of user.orders) {
            const order = await fetchOrderById(orderId);
            if (order) {
                orders.push(order);
            }
        }
        console.log("User orders:", orders);
        const ordersContainer = document.getElementById("orders-container");
        ordersContainer.innerHTML = orders.map(order => `
            <div class="order-card">
                <h3>Order ID: ${order._id}</h3>
                <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: $${order.totalPrice.toFixed(2)}</p>
                <p>Status: ${order.status}</p>
                <button id="view-details" class="card-button" data-order-id="${order._id}">View Details</button>
            </div>
            `).join("");
        }
        document.getElementById("view-details").addEventListener("click", (e) => {
            const orderId = e.target.getAttribute("data-order-id");
            window.location.href = `orderDetails.html?orderId=${orderId}`;
        });
};