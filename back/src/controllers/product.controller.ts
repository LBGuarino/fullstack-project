import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getCategoriesService, getProductByIdService, getProductsService } from "../services/products.service";

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
    console.log(categories)
    res.json(categories);
  }
);