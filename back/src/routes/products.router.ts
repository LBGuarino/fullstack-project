import { Router } from "express";
import { 
    getCategories, 
    getProductById, 
    getProducts, 
    getProductsByCategory, 
    getProductByCategoryAndSlug 
} from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/categories/:category", getProductsByCategory);
router.get("/categories/:category/:productSlug", getProductByCategoryAndSlug);
router.get("/:id", getProductById);


export default router;
