"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.loginUserController = exports.registerUserController = void 0;
const jwt_utils_1 = require("../../utils/jwt-utils");
const user_service_1 = require("./user-service");
const registerUserController = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const userExist = await (0, user_service_1.getUserByEmailService)(email);
        if (userExist)
            return res.status(400).json({
                success: false,
                message: "Sorry, this email has already been taken."
            });
        const newUser = await (0, user_service_1.registerUserService)({
            email,
            password,
            username
        });
        const token = (0, jwt_utils_1.generateToken)({ id: newUser.id });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                ...newUser,
                token
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
exports.registerUserController = registerUserController;
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, user_service_1.loginUserService)(email, password);
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        const token = (0, jwt_utils_1.generateToken)({ id: user.id });
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                ...user,
                token
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
exports.loginUserController = loginUserController;
const updateUserController = async (req, res) => {
    try {
        const id = res.locals.user.id;
        const data = req.body;
        const user = await (0, user_service_1.getUserByIdSevice)(id);
        if (!user)
            return res.status(404).json({
                success: false,
                message: "Invalid user id"
            });
        const payload = { username: data.username || user.username };
        const updatedUser = await (0, user_service_1.updateUserService)(id, payload);
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
exports.updateUserController = updateUserController;
//# sourceMappingURL=user-handler.js.map