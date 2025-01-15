import { IProduct } from "./IProduct";

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  userId: number;
  products: IProduct[];
}