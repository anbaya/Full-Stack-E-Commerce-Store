const Product = require('./product.module');
const productServices = require('./product.services');

// Add Product
const addProduct = async (req, res) => {
	try {
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: "At least one image is required" });
		}
		const productData = {
			name: req.body.name,
			price: req.body.price,
			description: req.body.description,
			category: req.body.category,
			stock: req.body.stock,
			images: req.files.map(file => file.filename)
		};
		const product = await productServices.createProduct(productData);
		res.status(201).json(product);
	}catch (error) {
		console.error(error);
		if (error.name === 'ValidationError') {
			return res.status(501).json({message: error.message, errors: error.errors});
		}
		res.status(500).json({message: error.message});
	}
};

// Get All Products
const getAllProducts = async (req , res) => {
	try {
		const products = await productServices.getAllProducts();
		res.status(200).json(products);
	}catch (error) {
		res.status(500).json({message: error.message});
	}
};

// Get Product by ID
const getProductById = async (req , res) => {
	try {
		const {id} = req.params;
		const product = await productServices.getProductById(id);
		if (!product) {
			return res.status(404).json({message: "Product not found"});
		}
		res.status(200).json(product);
	}catch (error) {
		res.status(500).json({message: error.message});
	}
};

// Search Products by Name
const searchProductsByName = async (req, res) => {
	try {
		const nameToSearch = req.body.name;
		const products = await productServices.searchByName(nameToSearch);
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update Product by ID
const updateProductById = async (req , res) => {
	try {
		const {id} = req.params;
		
		// Prepare update data
		const updateData = { ...req.body };
		
		// Handle uploaded images
		if (req.files && req.files.length > 0) {
			updateData.images = req.files.map(file => file.filename);
		}
		
		const product = await productServices.updateProduct(id, updateData);
		if (!product) {
			return res.status(404).json({message: "Product not found"});
		}
		res.status(200).json(product);
	}
	catch (error) {
		res.status(500).json({message: error.message});
	}
};

// Delete Product by ID
const deleteProductById = async (req, res) => {
	try {
		const {id} = req.params;
		const product = await productServices.deleteProduct(id);
		if (!product) {
			return res.status(404).json({message: "Product not found"});
		}
		res.status(200).json({message: "Product deleted successfully"});
	}
	catch (error) {
		res.status(500).json({message: error.message});
	}
};

module.exports = {
	addProduct,
	getAllProducts,
	getProductById,
	searchProductsByName,
	updateProductById,
	deleteProductById
};