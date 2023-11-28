import { Router } from "express";
import { loginUserController, registerUserController, updateUserController } from "./user-handler";
import { registerUserValidator, loginUserValidator, updateUserValidator } from "./user-schema";
import { authenticateToken } from "../../utils/jwt-utils";

const router = Router();

router.post("/register", registerUserValidator, registerUserController);
router.post("/login", loginUserValidator, loginUserController);
router.put("/edit", authenticateToken, updateUserValidator, updateUserController);


export default router;
