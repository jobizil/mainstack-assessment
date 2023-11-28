import { Router } from "express";
import { addProductController, getAllProductsController, getProductByIdController, updateProductController, deleteProductController, getAllProductsByUserIdController } from "./product-handler";
import { addProductValidator } from "./product-schema";
import { authenticateToken } from "../../utils/jwt-utils";

const router = Router();

router.post("/add", authenticateToken, addProductValidator, addProductController);
router.get("/all", getAllProductsController);
router.get("/my/products", authenticateToken, getAllProductsByUserIdController);
router.get("/:id", getProductByIdController);
router.put("/:id", authenticateToken, updateProductController);
router.delete("/:id", authenticateToken, deleteProductController);


export default router;
