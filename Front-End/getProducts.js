{
    const API_URL = "http://localhost:3000/api/store/products";
    const IMAGE_BASE = "http://localhost:3000/images/";


    async function loadProducts() {
        try {
            const response = await axios.get(API_URL);
            const products = response.data;

            const container = document.getElementById("product-cards");

            container.innerHTML = products.map(product => `
                <div class="card" data-id="${product._id}">
                    <img src="${IMAGE_BASE + product.images[0]}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                </div>
            `).join("");
            document.addEventListener("click", (e) => {
                const card = e.target.closest(".card");
                if (!card) return;
                const productId = card.dataset.id;
                window.location.href = `productPage.html?ProductId=${productId}`;
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }

    window.onload = loadProducts;
}