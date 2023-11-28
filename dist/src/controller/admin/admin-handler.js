"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = exports.getUserByIdController = exports.uploadImageController = void 0;
const user_service_1 = require("../user/user-service");
const validate_user_1 = require("../../middleware/validate-user");
const uploadImageController = async (req, res) => {
};
exports.uploadImageController = uploadImageController;
const getUserByIdController = async (req, res) => {
    try {
        const loggedInId = res.locals.user.id;
        const validRole = await (0, validate_user_1.validateRole)(loggedInId);
        if (!validRole.success)
            return res.status(401).json({
                success: false,
                message: validRole.message
            });
        const { id } = req.params;
        const user = await (0, user_service_1.getUserByIdSevice)(id);
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
exports.getUserByIdController = getUserByIdController;
const getAllUsersController = async (req, res) => {
    try {
        const id = res.locals.user.id;
        const validRole = await (0, validate_user_1.validateRole)(id);
        if (!validRole.success)
            return res.status(401).json({
                success: false,
                message: validRole.message
            });
        const users = await (0, user_service_1.getAllUsersService)();
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
exports.getAllUsersController = getAllUsersController;
//# sourceMappingURL=admin-handler.js.map