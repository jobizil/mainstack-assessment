"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const jsonwebtoken_2 = require("jsonwebtoken");
const generateToken = (payload) => {
    const options = {
        expiresIn: config_1.JWT_EXPIRY,
        algorithm: "HS256"
    };
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET, options);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        let decoded;
        decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_2.TokenExpiredError) {
            throw new Error("Token expired");
        }
        throw new Error("Invalid token");
    }
};
exports.verifyToken = verifyToken;
const authenticateToken = async (req, res, next) => {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return res.status(401).json({
                message: "Missing authorization header"
            });
        }
        const bearer = authorization.split(" ");
        if (!bearer || bearer.length < 2) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
        const token = bearer[1];
        const decoded = await (0, exports.verifyToken)(token);
        if (decoded) {
            res.locals.user = decoded;
        }
        return next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=jwt-utils.js.map