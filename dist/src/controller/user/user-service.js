"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserService = exports.getAllUsersService = exports.loginUserService = exports.getUserByIdSevice = exports.getUserByEmailService = exports.registerUserService = void 0;
const database_server_1 = require("../../utils/database-server");
const password_util_1 = require("../../utils/password-util");
function exclude(obj, keys) {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
}
const registerUserService = async (payload) => {
    const hashedPassword = await (0, password_util_1.hashPassword)(payload.password);
    const newUser = await database_server_1.db.user.create({
        data: {
            email: payload.email,
            password: hashedPassword,
            username: payload.username,
        }
    });
    return exclude(newUser, ["password", "updatedAt"]);
};
exports.registerUserService = registerUserService;
const getUserByEmailService = async (email) => {
    const user = await database_server_1.db.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            username: true,
            password: true,
            createdAt: false,
            updatedAt: false
        }
    });
    return user;
};
exports.getUserByEmailService = getUserByEmailService;
const getUserByIdSevice = async (id) => {
    const user = await database_server_1.db.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            username: true,
            createdAt: false,
            updatedAt: false
        }
    });
    if (!user) {
        throw new Error("Invalid user id.");
    }
    return user;
};
exports.getUserByIdSevice = getUserByIdSevice;
const loginUserService = async (email, password) => {
    const user = await (0, exports.getUserByEmailService)(email);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = await (0, password_util_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    return exclude(user, ["password"]);
};
exports.loginUserService = loginUserService;
const getAllUsersService = async () => {
    const users = await database_server_1.db.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            createdAt: false,
            updatedAt: false
        }
    });
    return users.map((user) => { return user; });
};
exports.getAllUsersService = getAllUsersService;
const updateUserService = async (id, payload) => {
    const user = await database_server_1.db.user.update({
        where: { id },
        data: payload,
    });
    const updatedUser = exclude(user, ["password", "updatedAt"]);
    return {
        ...updatedUser,
    };
};
exports.updateUserService = updateUserService;
//# sourceMappingURL=user-service.js.map