import { db } from "../../utils/database-server";

export interface ProductInterface {
    id?: string;
    name: string;
    price: number;
    description: string;
    slug: string;
    quantity: number;
    image: string[];
    userId: string;
}


// Add a new product
export const addProductService = async (payload: ProductInterface) => {

    const newProduct = await db.product.create({
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

    return newProduct

}

// Get all products

export const getAllProductsService = async () => {

    const products = await db.product.findMany({
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

    return products
}


// Get a product by id

export const getProductByIdService = async (productId: string) => {

    const product = await db.product.findUnique({
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
    return product

}


// Update a product

export const updateProductService = async (productId: string, payload: Partial<ProductInterface>) => {

    const product = await getProductByIdService(productId);

    if (!product) {
        throw new Error("Invalid product id.");
    }

    const updatedProduct = await db.product.update({
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

    return updatedProduct

}


// Delete a product

export const deleteProductService = async (productId: string, userId: string) => {

    const product = await getProductByIdService(productId);
    if (!product) {
        throw new Error("Invalid product id.");
    }

    if (product && product.userId !== userId) {
        throw new Error("Sorry, you can't delete product not created by you.");
    }

    const deletedProduct = await db.product.delete({
        where: { id: productId }
    });

    return deletedProduct

}

// Get all products by user id

export const getAllProductsByUserIdService = async (userId: string) => {

    const products = await db.product.findMany({
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

    return products
}

// Get One product by user id

export const getOneProductByUserIdService = async (userId: string, productId: string) => {

    const product = await db.product.findFirst({
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
    return product
}
