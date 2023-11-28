"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.addProductValidator = void 0;
const z = __importStar(require("zod"));
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
exports.addProductValidator = validateSchema(addProductSchema);
exports.updateValidator = validateSchema(updateProductSchema);
//# sourceMappingURL=product-schema.js.map