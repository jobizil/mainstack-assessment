"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const product_service_1 = require("../controller/product/product-service");
const slug_generator_1 = require("../helpers/slug-generator");
const prisma = new client_1.PrismaClient();
describe('Product Service', () => {
    let product;
    let newProduct;
    beforeAll(async () => {
        await prisma.product.deleteMany({});
        product = {
            userId: "6563c17177906b732e7c1826",
            name: 'product1',
            price: 100,
            description: 'description',
            slug: (0, slug_generator_1.generateSlug)('product1'),
            quantity: 10,
            image: [
                "https://pixabay.com/photos/goose-bird-animal-nature-wildlife-8222013.jpg",
                "https://pixabay.com/photos/goose-bird-animal-nature-wildlife-8222013.jpg",
                "https://pixabay.com/photos/goose-bird-animal-nature-wildlife-8222013.jpg"
            ]
        };
    });
    afterAll(async () => {
        await prisma.product.deleteMany({});
        await prisma.$disconnect();
    });
    it('should add a new product', async () => {
        newProduct = await (0, product_service_1.addProductService)(product);
        expect(newProduct).toHaveProperty('id');
        expect(newProduct).toHaveProperty('name');
        expect(newProduct).toHaveProperty('price');
        expect(newProduct).toHaveProperty('description');
        expect(newProduct).toHaveProperty('slug');
        expect(newProduct).toHaveProperty('quantity');
        expect(newProduct).toHaveProperty('image');
    });
    it('should get a product by id', async () => {
        const productById = await (0, product_service_1.getProductByIdService)(String(newProduct.id));
        expect(productById).toHaveProperty('id');
        expect(productById).toHaveProperty('name');
        expect(productById).toHaveProperty('price');
        expect(productById).toHaveProperty('description');
        expect(productById).toHaveProperty('slug');
        expect(productById).toHaveProperty('quantity');
        expect(productById).toHaveProperty('image');
    });
    it('should get all products', async () => {
        const products = await (0, product_service_1.getAllProductsService)();
        expect(products).toHaveLength(1);
    });
    it('should update a product', async () => {
        const updatedProduct = await (0, product_service_1.updateProductService)(String(newProduct.id), { name: 'product2' });
        expect(updatedProduct).toHaveProperty('id');
        expect(updatedProduct).toHaveProperty('name');
        expect(updatedProduct).toHaveProperty('price');
        expect(updatedProduct).toHaveProperty('description');
        expect(updatedProduct).toHaveProperty('slug');
        expect(updatedProduct).toHaveProperty('quantity');
        expect(updatedProduct).toHaveProperty('image');
    });
    it('should delete a product', async () => {
        const deletedProduct = await (0, product_service_1.deleteProductService)(String(newProduct.id), String(newProduct.userId));
        expect(deletedProduct).toHaveProperty('id');
    });
});
//# sourceMappingURL=product.test.js.map