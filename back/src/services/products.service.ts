import { Request } from "express";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";
import { ILike } from "typeorm";
import { Category } from "../entities/Category";
import { CategoryRepository } from "../repositories/category.respository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};

export const getProductsService = async (search?: string): Promise<Product[]> => {
  if (search) {
    return await searchProductsService(search);
  } else {
    return await ProductRepository.find();
  }
};

export const getProductByIdService = async (req: Request): Promise<Product | null> => {
  const { id } = req.params;
  const product = await ProductRepository.findOne({
    where: { id: Number(id) },
    relations: ['category'],
  });
  return product;
};

export const searchProductsService = async (search: string): Promise<Product[]> => {
  return await ProductRepository.find({
    where: {
      name: ILike(`%${search}%`)
    }
  });
};

export const getCategoriesService = async (req: Request): Promise<Category[]> => {
  return await CategoryRepository.find({relations: ['products']});
  
};