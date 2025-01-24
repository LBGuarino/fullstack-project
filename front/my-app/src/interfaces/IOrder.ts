import { ProductDetails } from "@/context/CartContext";

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  userId: number;
  orderProducts: OrderProduct[];
}

export interface OrderProduct {
  product: ProductDetails;
  quantity: number;
}