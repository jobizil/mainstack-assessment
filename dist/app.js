"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./src/utils/config");
Object.defineProperty(exports, "DATABASE_URL", { enumerable: true, get: function () { return config_1.DATABASE_URL; } });
const validate_env_1 = __importDefault(require("./src/utils/validate-env"));
require("dotenv").config();
const product_route_1 = __importDefault(require("./src/controller/product/product-route"));
const user_route_1 = __importDefault(require("./src/controller/user/user-route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, validate_env_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get(`/api/${config_1.API_VERSION}/check`, (_, Response) => Response.send("App is running!"));
app.use(`/api/${config_1.API_VERSION}/auth`, user_route_1.default);
app.use(`/api/${config_1.API_VERSION}/product`, product_route_1.default);
const ENV = config_1.NODE_ENV || "development";
if (ENV === "development") {
    require("dotenv").config({ path: ".env.development" });
}
else if (ENV === "production") {
    require("dotenv").config({ path: ".env" });
}
exports.default = app;
//# sourceMappingURL=app.js.map