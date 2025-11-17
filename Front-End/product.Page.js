const params = new URLSearchParams(window.location.search);
const productId = params.get("ProductId");

let API_URL = `http://localhost:3000/api/store/products/${productId}`;
console.log("Fetching product with ID:", productId);
const IMAGE_BASE = "http://localhost:3000/images/";

async function loadProduct() {
    try {
        const response = await axios.get(API_URL, {
            headers: { 'Content-Type': 'application/json' }
        });
        const product = response.data;
        document.getElementById("mainImage").src = IMAGE_BASE + product.images[0];
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

window.onload = loadProduct;