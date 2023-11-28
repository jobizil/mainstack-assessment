import { PrismaClient } from '@prisma/client';
import { ProductInterface, addProductService, getAllProductsService, getProductByIdService, updateProductService, deleteProductService } from '../controller/product/product-service';

import { generateSlug } from "../helpers/slug-generator";

const prisma: PrismaClient = new PrismaClient();
type ProductType = {
    id?: string;
    name: string;
    price: number;
    description: string;
    slug: string;
    quantity: number;
    image: string[]
    userId: string;
}

describe('Product Service', () => {
    let product: ProductInterface;
    let newProduct: ProductInterface;

    // Create a product and initialize the database in a transaction
    beforeAll(async () => {

        await prisma.product.deleteMany({})

        product = {

            userId: "6563c17177906b732e7c1826",
            name: 'product1',
            price: 100,
            description: 'description',
            slug: generateSlug('product1'),
            quantity: 10,
            image: [
                "https://pixabay.com/photos/goose-bird-animal-nature-wildlife-8222013.jpg",
                "https://pixabay.com/photos/goose-bird-animal-nature-wildlife-8222013.jpg",
                "https://pixabay.com/photos/goose-bird-animal-nature-wildlife-8222013.jpg"
            ]
        }


    });

    // Clears the database and disconnect from Prisma after all tests are done
    afterAll(async () => {
        await prisma.product.deleteMany({});
        await prisma.$disconnect();
    });

    // Add a new product
    it('should add a new product', async () => {
        newProduct = await addProductService(product) as ProductType;
        expect(newProduct).toHaveProperty('id');
        expect(newProduct).toHaveProperty('name');
        expect(newProduct).toHaveProperty('price');
        expect(newProduct).toHaveProperty('description');
        expect(newProduct).toHaveProperty('slug');
        expect(newProduct).toHaveProperty('quantity');
        expect(newProduct).toHaveProperty('image');
    });

    // Get a product by id
    it('should get a product by id', async () => {
        const productById = await getProductByIdService(String(newProduct.id));
        expect(productById).toHaveProperty('id');
        expect(productById).toHaveProperty('name');
        expect(productById).toHaveProperty('price');
        expect(productById).toHaveProperty('description');
        expect(productById).toHaveProperty('slug');
        expect(productById).toHaveProperty('quantity');
        expect(productById).toHaveProperty('image');
    });


    // Get all products
    it('should get all products', async () => {
        const products = await getAllProductsService();
        expect(products).toHaveLength(1);
    });


    // Update a product
    it('should update a product', async () => {
        const updatedProduct = await updateProductService(String(newProduct.id), { name: 'product2' }) as ProductType;
        expect(updatedProduct).toHaveProperty('id');
        expect(updatedProduct).toHaveProperty('name');
        expect(updatedProduct).toHaveProperty('price');
        expect(updatedProduct).toHaveProperty('description');
        expect(updatedProduct).toHaveProperty('slug');
        expect(updatedProduct).toHaveProperty('quantity');
        expect(updatedProduct).toHaveProperty('image');
    });


    // Delete a product
    it('should delete a product', async () => {
        const deletedProduct = await deleteProductService(String(newProduct.id), String(newProduct.userId)) as ProductType;
        expect(deletedProduct).toHaveProperty('id');
        expect(deletedProduct).toHaveProperty('name');
        expect(deletedProduct).toHaveProperty('price');
        expect(deletedProduct).toHaveProperty('description');
        expect(deletedProduct).toHaveProperty('slug');
        expect(deletedProduct).toHaveProperty('quantity');
        expect(deletedProduct).toHaveProperty('image');
    });
})
