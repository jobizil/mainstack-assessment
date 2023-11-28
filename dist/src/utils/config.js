"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.JWT_EXPIRY = exports.API_VERSION = exports.SECRET_KEY = exports.DATABASE_URL = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env` });
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.DATABASE_URL = _a.DATABASE_URL, exports.SECRET_KEY = _a.SECRET_KEY, exports.API_VERSION = _a.API_VERSION, exports.JWT_EXPIRY = _a.JWT_EXPIRY, exports.JWT_SECRET = _a.JWT_SECRET;
//# sourceMappingURL=config.js.map