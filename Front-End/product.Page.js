const params = new URLSearchParams(window.location.search);
const productId = params.get("ProductId");

let API_URL = `http://localhost:3000/api/store/products/${productId}`;
let PRODUCTS_API_URL = "http://localhost:3000/api/store/products";
const TOKEN = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
const IMAGE_BASE = "http://localhost:3000/images/";


function pickRandom(arr, count) {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

async function checkIdentity() {
    try {
        if (!TOKEN) {
            return false;
        }
        const response = await axios.get("http://localhost:3000/api/users/me", {
            headers: {'Authorization': `Bearer ${TOKEN}`}
        });
        return response.status === 200;
    } catch (error) {
        console.error("Identity check failed:", error);
        return false;
    }
}

async function getUser() {
    try {
        if (!TOKEN) {
            return null;
        }
        const response = await axios.get("http://localhost:3000/api/users/me", {
            headers: {'Authorization': `Bearer ${TOKEN}`}
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Get user failed:", error);
        return null;
    }
}

async function AddToCart(perchaseInfo) {
    try {
        const user = await getUser();
        if (!user) {
            throw new Error("User not authenticated");
        }
        perchaseInfo.cartId = user.card;
        console.log("card is before request:", perchaseInfo.cartId);
        const response = await axios.post("http://localhost:3000/api/cards/add-to-cart", perchaseInfo, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (user.card != response.data.card._id) {
            user.card = response.data.card._id;
            await axios.put(`http://localhost:3000/api/users/${user._id}`, { card: user.card }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
        console.log("card is after request:", response.data.card._id);
        return response;
    } catch (error) {
        console.error("Add to cart error:", error);
        throw error;
    }
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
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("preview")) {
        document.getElementById("mainImage").src = e.target.src;
    }
    else if (e.target.classList.contains("card") || e.target.classList.contains("pimage")){
        window.location.href = `./productPage.html?ProductId=${e.target.closest(".card").getAttribute("data-id")}`;
    }
    else if (e.target.id === "addToCartButton") {
        const isAuthenticated = document.cookie.includes("token") && await checkIdentity();
        if (isAuthenticated) {
            const productName = document.getElementById("productTitle").innerText;
            const productPriceText = document.getElementById("productPrice").innerText;
            const productPrice = parseFloat(productPriceText.replace('$', ''));
            const quantity = parseInt(document.getElementById("quantity").value, 10);
            const perchaseInfo = {
                productId: productId,
                productName: productName,
                productTotal: productPrice * quantity,
                quantity: quantity
            };
            console.log("Perchase Info:", perchaseInfo);
            const cardResponse = await AddToCart(perchaseInfo);
            if (cardResponse.status === 200) {
                alert("Product added to cart!");
                return;
            }
            alert("Failed to add product to cart. Please try again.");
        }else{
            window.location.href = "./login-page.html";
        }
    }
});

window.onload = async () => {
    loadProduct();
    loadProducts();
};