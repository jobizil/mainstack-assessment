"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProductByUserIdService = exports.getAllProductsByUserIdService = exports.deleteProductService = exports.updateProductService = exports.getProductByIdService = exports.getAllProductsService = exports.addProductService = void 0;
const database_server_1 = require("../../utils/database-server");
const addProductService = async (payload) => {
    const newProduct = await database_server_1.db.product.create({
        data: {
            name: payload.name,
            price: payload.price,
            description: payload.description,
            slug: payload.slug,
            quantity: payload.quantity,
            userId: payload.userId,
            image: payload.image
        }
    });
    return newProduct;
};
exports.addProductService = addProductService;
const getAllProductsService = async () => {
    const products = await database_server_1.db.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            slug: true,
            quantity: true,
            userId: true,
            image: true,
            createdAt: false,
            updatedAt: false
        }
    });
    return products;
};
exports.getAllProductsService = getAllProductsService;
const getProductByIdService = async (productId) => {
    const product = await database_server_1.db.product.findUnique({
        where: { id: productId },
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            slug: true,
            quantity: true,
            userId: true,
            image: true,
            createdAt: false,
            updatedAt: false
        }
    });
    if (!product) {
        throw new Error("Invalid product id.");
    }
    return product;
};
exports.getProductByIdService = getProductByIdService;
const updateProductService = async (productId, payload) => {
    const product = await (0, exports.getProductByIdService)(productId);
    if (!product) {
        throw new Error("Invalid product id.");
    }
    const updatedProduct = await database_server_1.db.product.update({
        where: { id: productId },
        data: {
            name: payload.name || product.name,
            price: payload.price || product.price,
            description: payload.description || product.description,
            slug: payload.slug || product.slug,
            quantity: payload.quantity || product.quantity,
            userId: payload.userId || product.userId
        }
    });
    return updatedProduct;
};
exports.updateProductService = updateProductService;
const deleteProductService = async (productId, userId) => {
    const product = await (0, exports.getProductByIdService)(productId);
    if (!product) {
        throw new Error("Invalid product id.");
    }
    const deletedProduct = await database_server_1.db.product.delete({
        where: { id: productId, userId: userId }
    });
    return deletedProduct;
};
exports.deleteProductService = deleteProductService;
const getAllProductsByUserIdService = async (userId) => {
    const products = await database_server_1.db.product.findMany({
        where: { userId },
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            slug: true,
            quantity: true,
            userId: true,
            image: true,
            createdAt: false,
            updatedAt: false
        }
    });
    return products;
};
exports.getAllProductsByUserIdService = getAllProductsByUserIdService;
const getOneProductByUserIdService = async (userId, productId) => {
    const product = await database_server_1.db.product.findFirst({
        where: { userId, id: productId },
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            slug: true,
            quantity: true,
            userId: true,
            image: true,
            createdAt: false,
            updatedAt: false
        }
    });
    if (!product) {
        throw new Error("Invalid product id.");
    }
    return product;
};
exports.getOneProductByUserIdService = getOneProductByUserIdService;
//# sourceMappingURL=product-service.js.map