import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const registerUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(4, { message: 'Password is required' }),
    username: z.string().min(3, { message: 'Username is required' }),
});

const loginUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(4, { message: 'Password is required' }),
});

const updateUserSchema = z.object({
    username: z.string().optional(),
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

export const registerUserValidator = validateSchema(registerUserSchema);
export const loginUserValidator = validateSchema(loginUserSchema);
export const updateUserValidator = validateSchema(updateUserSchema);
