{
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    const URL = `http://52.90.2.111:3000/api/orders/${orderId}`;

    function displayOrderDetails(order, user) {
        const orderDetailsSection = document.getElementById("order-details");
        orderDetailsSection.innerHTML = `
            <div class="order">
                <h2>Order ID: ${order._id}</h2>
                <p><strong>Customer:</strong> ${user._id}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${order.address}</p>
                <p><strong>Total Amount:</strong> $${order.totalPrice}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            </div>
        `;
    };

    function displayProducts(products) {
        const productsListSection = document.getElementById("products-list");
        productsListSection.innerHTML = products.map(product => `
            <div class="product">
                <h3>${product.ProductName}</h3>
                <p><strong>Price:</strong> $${product.productTotal}</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
            </div>
        `).join("");
    }

    async function getUserData(userId) {
        try {
            const response = await axios.get(`http://52.90.2.111:3000/api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    };
    async function fetchOrderDetails() {
        try {
            const response = await axios.get(URL);
            const order = response.data;
            const user = await getUserData(order.user);
            displayOrderDetails(order, user);
            const products = order.products;
            displayProducts(products);
        } catch (error) {
            console.error("Error fetching order details:", error);
            alert("Failed to fetch order details. Please try again.");
        }
    }


    window.onload = fetchOrderDetails;
}