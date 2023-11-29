
import { Request, Response } from "express";
import { ProductInterface, addProductService, deleteProductService, getAllProductsService, getProductByIdService, getAllProductsByUserIdService, updateProductService } from "./product-service";
import { generateSlug } from "../../helpers/slug-generator";


// Add a new product
export const addProductController = async (req: Request, res: Response) => {
    const loggedInUserId = res.locals.user.id;
    try {
        const { name, price, description, quantity, image } = req.body as ProductInterface

        const newProduct = await addProductService({
            name,
            price,
            description,
            quantity,
            image,
            slug: generateSlug(name),
            userId: loggedInUserId
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error: any) {

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

}

// Get all products
export const getAllProductsController = async (req: Request, res: Response) => {

    try {

        const products = await getAllProductsService();

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });

    } catch (error: any) {

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

}

// Get a product by id
export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const product = await getProductByIdService(productId);

        if (!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        });

        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product
        });

    } catch (error: any) {

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

}

// Update a product

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const data = req.body as ProductInterface

        const product = await getProductByIdService(productId);

        if (!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        });

        const updatedProduct = await updateProductService(productId, data);

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (error: any) {

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// Delete a product
export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = res.locals.user.id
        const productId = req.params.id;

        const product = await getProductByIdService(productId);

        if (!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        });

        await deleteProductService(productId, loggedInUserId);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error: any) {

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// Get all products by user id
export const getAllProductsByUserIdController = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = res.locals.user.id

        const products = await getAllProductsByUserIdService(loggedInUserId);

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });

    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}