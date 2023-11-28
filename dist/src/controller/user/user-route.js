"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_handler_1 = require("./user-handler");
const user_schema_1 = require("./user-schema");
const jwt_utils_1 = require("../../utils/jwt-utils");
const router = (0, express_1.Router)();
router.post("/register", user_schema_1.registerUserValidator, user_handler_1.registerUserController);
router.post("/login", user_schema_1.loginUserValidator, user_handler_1.loginUserController);
router.put("/edit", jwt_utils_1.authenticateToken, user_schema_1.updateUserValidator, user_handler_1.updateUserController);
exports.default = router;
//# sourceMappingURL=user-route.js.map