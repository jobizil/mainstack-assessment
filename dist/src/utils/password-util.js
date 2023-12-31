"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
async function hashPassword(password) {
    return bcryptjs_1.default.hash(password, saltRounds);
}
exports.hashPassword = hashPassword;
async function comparePassword(userPassword, hashedPassword) {
    return bcryptjs_1.default.compare(userPassword, hashedPassword);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=password-util.js.map