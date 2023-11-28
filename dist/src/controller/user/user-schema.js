"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = exports.loginUserValidator = exports.registerUserValidator = void 0;
const zod_1 = require("zod");
const registerUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(4, { message: 'Password is required' }),
    username: zod_1.z.string().min(3, { message: 'Username is required' }),
});
const loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(4, { message: 'Password is required' }),
});
const updateUserSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
});
const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            res.status(400).json({ errors: error.errors });
        }
    };
};
exports.registerUserValidator = validateSchema(registerUserSchema);
exports.loginUserValidator = validateSchema(loginUserSchema);
exports.updateUserValidator = validateSchema(updateUserSchema);
//# sourceMappingURL=user-schema.js.map