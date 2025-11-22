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

const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");

if (editButton) {
    editButton.addEventListener("click", () => {
        window.location.href = `./editProduct.html?ProductId=${productId}`;
    });
}

if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
        try {
            await axios.delete(API_URL, {
                headers: { 'Content-Type': 'application/json' }
            });
            alert("Product deleted successfully!");
            window.location.href = "./product.html";
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    });
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("preview")) {
        document.getElementById("mainImage").src = e.target.src;
    }
});

window.onload = loadProduct;