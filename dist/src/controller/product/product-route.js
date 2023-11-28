"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_handler_1 = require("./product-handler");
const product_schema_1 = require("./product-schema");
const jwt_utils_1 = require("../../utils/jwt-utils");
const router = (0, express_1.Router)();
router.post("/add", jwt_utils_1.authenticateToken, product_schema_1.addProductValidator, product_handler_1.addProductController);
router.get("/all", product_handler_1.getAllProductsController);
router.get("/my/products", jwt_utils_1.authenticateToken, product_handler_1.getAllProductsByUserIdController);
router.get("/:id", product_handler_1.getProductByIdController);
router.put("/:id", jwt_utils_1.authenticateToken, product_handler_1.updateProductController);
router.delete("/:id", jwt_utils_1.authenticateToken, product_handler_1.deleteProductController);
exports.default = router;
//# sourceMappingURL=product-route.js.map