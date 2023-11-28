import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

const addProductSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    price: z.number().refine((val) => val > 0, { message: 'Price must be greater than 0' }),
    description: z.string().min(1, { message: 'Description is required' }),
    quantity: z.number().refine((val) => val > 0, { message: 'Quantity must be greater than 0' }),
    image: z.array(z.string()).min(1, { message: 'Image is required' })
});


const updateProductSchema = z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    image: z.array(z.string()).optional()

});

const validateSchema = (schema: z.ZodObject<any, any>): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error: any) {
            res.status(400).json({ errors: error.errors });
        }
    };
};

export const addProductValidator = validateSchema(addProductSchema);

export const updateValidator = validateSchema(updateProductSchema);
