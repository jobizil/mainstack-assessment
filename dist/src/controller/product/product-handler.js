"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsByUserIdController = exports.deleteProductController = exports.updateProductController = exports.getProductByIdController = exports.getAllProductsController = exports.addProductController = void 0;
const product_service_1 = require("./product-service");
const slug_generator_1 = require("../../helpers/slug-generator");
const addProductController = async (req, res) => {
    const loggedInUserId = res.locals.user.id;
    try {
        const { name, price, description, quantity, image } = req.body;
        const newProduct = await (0, product_service_1.addProductService)({
            name,
            price,
            description,
            quantity,
            image,
            slug: (0, slug_generator_1.generateSlug)(name),
            userId: loggedInUserId
        });
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
exports.addProductController = addProductController;
const getAllProductsController = async (req, res) => {
    try {
        const products = await (0, product_service_1.getAllProductsService)();
        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
exports.getAllProductsController = getAllProductsController;
const getProductByIdController = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await (0, product_service_1.getProductByIdService)(productId);
        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
exports.getProductByIdController = getProductByIdController;
const updateProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        const product = await (0, product_service_1.getProductByIdService)(productId);
        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        const updatedProduct = await (0, product_service_1.updateProductService)(productId, data);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
exports.updateProductController = updateProductController;
const deleteProductController = async (req, res) => {
    try {
        const loggedInUserId = res.locals.user.id;
        const productId = req.params.id;
        const product = await (0, product_service_1.getProductByIdService)(productId);
        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        await (0, product_service_1.deleteProductService)(productId, loggedInUserId);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
exports.deleteProductController = deleteProductController;
const getAllProductsByUserIdController = async (req, res) => {
    try {
        const loggedInUserId = res.locals.user.id;
        const products = await (0, product_service_1.getAllProductsByUserIdService)(loggedInUserId);
        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
exports.getAllProductsByUserIdController = getAllProductsByUserIdController;
//# sourceMappingURL=product-handler.js.map