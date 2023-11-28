"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = void 0;
const user_service_1 = require("../controller/user/user-service");
const validateRole = async (id) => {
    const user = await (0, user_service_1.getUserByIdSevice)(id);
    if (!user)
        return {
            success: false,
            message: "Invalid user id"
        };
    return {
        success: true,
        message: "Valid user id"
    };
};
exports.validateRole = validateRole;
//# sourceMappingURL=validate-user.js.map