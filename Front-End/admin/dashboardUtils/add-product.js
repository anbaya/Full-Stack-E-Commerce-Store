{
    const URL = "http://localhost:3000/api/store/products";

    document.getElementById("add-product-form").addEventListener("submit", async (e) => {
        e.preventDefault();

    const form = document.getElementById("add-product-form");
    const formData = new FormData();

    formData.append("name", form.name.value);
    formData.append("price", form.price.value);
    formData.append("description", form.description.value);
    formData.append("category", form.category.value);
    formData.append("stock", form.stock.value);

    const files = form.images.files;

    for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
    }
    try {
        const response = await axios.post(URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert("Product added successfully!");
        form.reset();
        window.location.href = "./editProduct.html";
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
    }
});
}



// document.querySelector('input[name="image"]').addEventListener("change", (e) => {
//     const file = e.target.files[0];
//     const preview = document.getElementById("preview");

//     if (file) {
//         preview.src = URL.createObjectURL(file);
//         preview.style.display = "block";
//     }
// });