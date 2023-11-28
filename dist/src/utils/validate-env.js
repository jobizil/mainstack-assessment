"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const envalid_1 = require("envalid");
(0, dotenv_1.config)({ path: `.env` });
const validateEnv = () => {
    (0, envalid_1.cleanEnv)(process.env, {
        PORT: (0, envalid_1.port)(),
        DATABASE_URL: (0, envalid_1.str)(),
        NODE_ENV: (0, envalid_1.str)(),
        API_VERSION: (0, envalid_1.str)(),
        JWT_EXPIRY: (0, envalid_1.str)(),
        JWT_SECRET: (0, envalid_1.str)()
    });
};
exports.default = validateEnv;
//# sourceMappingURL=validate-env.js.map