let API_URL = "/api/store/products";
const IMAGE_BASE = "/images/";


function pickRandom(arr, count) {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

async function loadProducts() {
    try {
        const response = await axios.get(API_URL);
        const products = pickRandom(response.data, 10);

        const container = document.getElementById("product-cards");

        container.innerHTML = products.map(product => `
            <div class="card" data-id="${product._id}">
                <img src="${IMAGE_BASE + product.images[0]}" alt="${product.name}">
                <h2>${product.name}</h2>
                <span class="product-price">$${product.price.toFixed(2)}</span>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error fetching products:", error);
        const container = document.getElementById("product-cards");
        container.innerHTML = `<p class="error-message">Failed to load products. Please try again later.</p>`;
    }
}
document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const productId = card.dataset.id;
    if (productId) {
        window.location.href = `productPage.html?ProductId=${productId}`;
    }
});

window.onload = loadProducts;