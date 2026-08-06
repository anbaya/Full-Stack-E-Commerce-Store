let ids = 0;
let product = {
    id,
    title,
    description,
    price,
    image,
};
let cart = [];
let products = [];
function createProduct()
{
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let price = parseFloat(document.getElementById("price").value);
    let image = document.getElementById("image").value;
    product = {
        id: ids +1,
        title: title,
        description: description,
        price: price,
        image: image
    };
    title.value = "";
    description.value = "";
    price.value = "";
    image.value = "";
    ids++;
    return product;
}

function pushProduct()
{
    products.push(createProduct());
}
function addToCart()
{
    cart.push(id);
}