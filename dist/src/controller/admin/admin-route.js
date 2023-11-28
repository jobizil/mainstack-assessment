"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_utils_1 = require("../../utils/jwt-utils");
const multer_config_1 = require("../../utils/multer-config");
const admin_handler_1 = require("./admin-handler");
const router = (0, express_1.Router)();
router.get("/users", jwt_utils_1.authenticateToken, admin_handler_1.getAllUsersController);
router.get("/users/:id", jwt_utils_1.authenticateToken, admin_handler_1.getUserByIdController);
router.post("/upload/:id", jwt_utils_1.authenticateToken, multer_config_1.upload.single("image"), admin_handler_1.uploadImageController);
exports.default = router;
//# sourceMappingURL=admin-route.js.map