
import express from "express";
import { DATABASE_URL, NODE_ENV, API_VERSION } from "./src/utils/config";
import valiateEnv from "./src/utils/validate-env";
require("dotenv").config();
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import userRoute from "./src/controller/user/user-route";
import productRouter from "./src/controller/product/product-route";


const app = express();

// Enable CORS
app.use(cors());


// Validate environment variables 
valiateEnv();


app.use(morgan("dev"));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({ extended: true }));


// Health Check
app.get(`/api/${API_VERSION}/check`, (_, Response) =>
    Response.send("App is running!")
);


// Routes

app.use(`/api/${API_VERSION}/auth`, userRoute);
app.use(`/api/${API_VERSION}/product`, productRouter);



const ENV = NODE_ENV || "development";

if (ENV === "development") {
    require("dotenv").config({ path: ".env.development" });
} else if (ENV === "production") {
    require("dotenv").config({ path: ".env" });
}


export { DATABASE_URL };

export default app;
