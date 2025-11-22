const params = new URLSearchParams(window.location.search);
const productId = params.get("ProductId");

let API_URL = `http://localhost:3000/api/store/products/${productId}`;
let PRODUCTS_API_URL = "http://localhost:3000/api/store/products";
console.log("Fetching product with ID:", productId);
const IMAGE_BASE = "http://localhost:3000/images/";


function pickRandom(arr, count) {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

async function loadProducts() {
    try {
        const response = await axios.get(PRODUCTS_API_URL);
        const products = pickRandom(response.data, 10);

        const container = document.getElementById("product-cards");

        container.innerHTML = products.map(product => `
            <div class="card" data-id="${product._id}">
                <img class="pimage" src="${IMAGE_BASE + product.images[0]}" alt="${product.name}">
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

async function loadProduct() {
    try {
        const response = await axios.get(API_URL, {
            headers: { 'Content-Type': 'application/json' }
        });
        const product = response.data;
        document.getElementById("mainImage").src = IMAGE_BASE + product.images[0];
        document.getElementById("previewImages").innerHTML = product.images.map((imgSrc, index) => `
            <img id="image${index + 1}" class="preview" src="${IMAGE_BASE + imgSrc}" alt="${product.name} image ${index + 1}">
        `).join("");
        product.images.forEach((imgSrc, index) => {
            const imgElement = document.getElementById(`image${index + 1}`);
            if (imgElement) {
                imgElement.src = IMAGE_BASE + imgSrc;
                imgElement.alt = product.name + ` image ${index + 1}`;
            }
        });
        document.getElementById("productTitle").innerText = product.name;
        document.getElementById("productDescription").innerText = product.description;
        document.getElementById("productPrice").innerText = `$${product.price.toFixed(2)}`;
        const stockElement = document.getElementById("stock");
        stockElement.innerText = product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock";
    } catch (error) {
        console.error("Error fetching product:", error);
    };
};

// Add event listeners to preview images using event delegation
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("preview")) {
        document.getElementById("mainImage").src = e.target.src;
    }
    else if (e.target.classList.contains("card") || e.target.classList.contains("pimage")){
        window.location.href = `./productPage.html?ProductId=${e.target.closest(".card").getAttribute("data-id")}`;
    }
    else if (e.target.id === "addToCartButton") {
        if (document.cookie.includes("token")) {
            alert("Product added to cart!");
        }else {
            window.location.href = "./login-page.html";
        }
    }
});

window.onload = () => {
    loadProduct();
    loadProducts();
};