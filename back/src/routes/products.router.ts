import { Router } from "express";
import { getCategories, getProductById, getProducts } from "../controllers/product.controller";

const router = Router();

router.get("/categories", getCategories);
router.get("/:id", getProductById);
router.get("/", getProducts);


export default router;
