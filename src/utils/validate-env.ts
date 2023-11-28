import { config } from "dotenv";
import { cleanEnv, port, str } from "envalid";

config({ path: `.env` });

const validateEnv = () => {
    cleanEnv(process.env, {
        PORT: port(),
        DATABASE_URL: str(),
        NODE_ENV: str(),
        API_VERSION: str(),
        JWT_EXPIRY: str(),
        JWT_SECRET: str()
    });
};

export default validateEnv;
