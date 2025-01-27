import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { 
  getCategoriesService, 
  getProductByIdService, 
  getProductsByCategoryService, 
  getProductsService, 
  getProductByCategoryAndSlugService 
} from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  }
);

export const getProductById = catchedController(
  async (req: Request, res: Response) => {
    const product = await getProductByIdService(req);
    res.json(product);
  }
);

export const getCategories = catchedController(
  async (req: Request, res: Response) => {
    const categories = await getCategoriesService(req);
    res.json(categories);
  }
);

export const getProductsByCategory = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsByCategoryService(req.params.category);
    res.json(products);
  }
);

export const getProductByCategoryAndSlug = catchedController(
  async (req: Request, res: Response) => {
    const product = await getProductByCategoryAndSlugService(req);
    res.json(product);
  }
);