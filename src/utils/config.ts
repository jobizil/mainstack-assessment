import { config } from "dotenv";
config({ path: `.env` });

export const {
    NODE_ENV,
    PORT,
    DATABASE_URL,
    SECRET_KEY,
    API_VERSION,
    JWT_EXPIRY,
    JWT_SECRET
} = process.env;

