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
    return await ProductRepository.find({
      relations: ['category'],
    });
  }
};

export const getProductsByCategoryService = async (category: string): Promise<Product[]> => {
  return await ProductRepository.find({
    where: {
      category: {
        name: category.charAt(0).toUpperCase() + category.slice(1),
      },
    },
    relations: ['category'],
  });
};

export const getProductByCategoryAndSlugService = async (req: Request): Promise<Product> => {
  const { category, productSlug } = req.params;
  const product = await ProductRepository.findOne({
    where: {
      slug: productSlug,
      category: {
        name: category.charAt(0).toUpperCase() + category.slice(1),
    },
  },
    relations: ['category'],
  });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const getProductByIdService = async (req: Request): Promise<Product> => {
  const { id } = req.params;
  const product = await ProductRepository.findOne({
    where: { id: Number(id) },
    relations: ['category'],
  });
  if (!product) {
    throw new Error('Product not found');
  }
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