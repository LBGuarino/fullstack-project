import { AppDataSource } from "../config/dataSource";
import { CartItem } from "../entities/CartItem";

export const CartItemRepository = AppDataSource.getRepository(CartItem);