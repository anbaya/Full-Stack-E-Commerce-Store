{
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    const URL = `/api/orders/${orderId}`;

    function displayOrderDetails(order) {
        const orderDetailsSection = document.getElementById("order-details");
        orderDetailsSection.innerHTML = `
            <div class="order">
                <h2>Order ID: ${order._id}</h2>
                <p><strong>Customer:</strong> ${order.user._id}</p>
                <p><strong>Email:</strong> ${order.user.email}</p>
                <p><strong>Address:</strong> ${order.address}</p>
                <p><strong>Total Amount:</strong> $${order.totalPrice}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            </div>
        `;
    };

    const quantity = (product, order) => {
        for (i = 0; i < order.products.length; i++) {
            if (order.products[i].product === product._id) {
                return order.products[i].quantity;
            }
        }
    }

    function displayProducts(products) {
        const productsListSection = document.getElementById("products-list");
        productsListSection.innerHTML = products.map(product => `
            <div class="product">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
            </div>
        `).join("");
    }

    async function fetchProducts(ids) {
        const products = [];
        try {
            for (const productId of ids) {
                const response = await axios.get(`/api/store/products/${productId.product}`);
                if (response.data) {
                    response.data.quantity = productId.quantity;
                    products.push(response.data);
                }
            }
            return products;
        } catch (error) {
            console.error("Error fetching product data:", error);
            return products;
        }
    }


    async function getUserData(userId) {
        try {
            const response = await axios.get(`/api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    };

    async function prepareOrderDetails(order) {
        const user = await getUserData(order.user);
        order.user = user;
        return order;
    };


    async function fetchOrderDetails() {
        try {
            const response = await axios.get(URL);
            const order = response.data;
            const detailedOrder = await prepareOrderDetails(order);
            displayOrderDetails(detailedOrder);
            const products = await fetchProducts(detailedOrder.products);
            displayProducts(products);
        } catch (error) {
            console.error("Error fetching order details:", error);
            alert("Failed to fetch order details. Please try again.");
        }
    }


    window.onload = fetchOrderDetails;
}