const order_URL = "http://52.90.2.111:3000/api/orders";


const orderListSection = document.getElementById("order-list");


async function getUserData(userId) {
    try {
        const response = await axios.get(`http://52.90.2.111:3000/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

async function fetchProducts(id) {
    try {
        const response = await axios.get(`http://52.90.2.111:3000/api/store/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error);
        return null;
    }
};

async function prepareOrderDetails(order) {
    const user = await getUserData(order.user);
    order.user = user;
    return order;
};



async  function fetchOrders() {
    try {
        const response = await axios.get(`${order_URL}/all`);
        const orders = response.data;
        const detailedOrders = await Promise.all(orders.map(order => prepareOrderDetails(order)));
        orderListSection.innerHTML = detailedOrders.map(order => `
            <div class="order">
                <h2>Order ID: ${order._id}</h2>
                <p><strong>Customer:</strong> ${order.user._id}</p>
                <p><strong>Email:</strong> ${order.user.email}</p>
                <p><strong>Address:</strong> ${order.address}</p>
                <p><strong>Total Amount:</strong> $${order.totalPrice}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <button class="order-button" data-id="${order._id}">Mark as Shipped</button>
                <button class="order-button" data-id="${order._id}">Cancel Order</button>
                <button class="order-button" data-id="${order._id}">View Details</button>
                <button class="order-button" data-id="${order._id}">Delete Order</button>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("order-button")) {
        const orderId = e.target.getAttribute("data-id");
        let newStatus = "";
        if (e.target.textContent === "Mark as Shipped") {
            newStatus = "shipped";
        } else if (e.target.textContent === "Cancel Order") {
            newStatus = "cancelled";
        }else if (e.target.textContent === "View Details") {
            window.location.href = `./orderDetails.html?orderId=${orderId}`;
            return;
        }else if (e.target.textContent === "Delete Order") {
            if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
                return;
            }
            try {
                await axios.delete(`${order_URL}/${orderId}`);
                alert("Order deleted successfully!");
                fetchOrders(); // Refresh the order list
            } catch (error) {
                    console.error("Error deleting order:", error);
                    alert("Failed to delete order. Please try again.");
                }
                return;
        }
        try {
            await axios.put(`${order_URL}/update-status/${orderId}`, { status: newStatus });
            alert(`Order ${newStatus} successfully!`);
            fetchOrders(); // Refresh the order list
        } catch (error) {
            console.error(`Error updating order status to ${newStatus}:`, error);
            alert("Failed to update order status. Please try again.");
        }
    }
});
window.onload = fetchOrders;