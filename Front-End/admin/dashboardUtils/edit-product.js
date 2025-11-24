{
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("ProductId");

    const URL = `http://52.90.2.111:3000/api/store/products/${productId}`;
    document.getElementById("add-product-form").addEventListener("submit", async (e) => {
        e.preventDefault();

    const form = document.getElementById("add-product-form");
    const formData = new FormData();

    if (form.name.value){
        formData.append("name", form.name.value);
    }
    if (form.price.value){
        formData.append("price", form.price.value);
    }
    if (form.description.value){
        formData.append("description", form.description.value);
    }
    if (form.category.value){
        formData.append("category", form.category.value);
    }
    if (form.stock.value){
        formData.append("stock", form.stock.value);
    }
    if (form.images.files.length > 0){
        const files = form.images.files;
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }
    }
    try {
        const response = await axios.put(URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Update response:", response.data);
        alert("Product edited successfully!");
        form.reset();
        window.location.href = "./product.html";
    } catch (error) {
        console.error("Error updating product:", error);
        console.error("Error response:", error.response?.data);
        alert("Failed to update product. Please try again.");
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