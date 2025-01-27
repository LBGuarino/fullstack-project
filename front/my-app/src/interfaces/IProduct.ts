import { ICategory } from "./ICategory";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  category: ICategory;
}