const Product = require('./product.module');

// Get All Products
async function getAllProducts() {
	const products = await Product.find();
	if (products) {
		return products;
	}
	throw new Error('No products found');
}

// Delete Product
async function deleteProduct(productId) {
	const deletedProduct = await Product.findByIdAndDelete(productId);
	if (!deletedProduct) {
		throw new Error('Product not found');
	}
	return deletedProduct;
}

// Create Product
async function createProduct(productData) {
	const newProduct = await Product.create(productData);
	if (newProduct) {
		return newProduct;
	}
	throw new Error('Product creation failed');
}

// Update Product
async function updateProduct(productId, productData) {
	const updatedProduct = await Product.findByIdAndUpdate(productId, productData);
	if (!updatedProduct) {
		throw new Error('Product update failed');
	}
	return updatedProduct;
}

// search Products by name
async function searchByName(nameToSearch) {
	const products = await Product.find({ name: nameToSearch });
	if (products) {
		return products;
	}
	throw new Error('No products found');
}

// get Product by ID

async function getProductById(productId) {
	const product = await Product.findById(productId);
	if (product) {
		return product;
	}
	throw new Error('Product not found');
}

module.exports = {
	getAllProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	searchByName,
	getProductById
};