import { AppDataSource } from "../config/dataSource";
import { Cart } from "../entities/Cart";

export const CartRepository = AppDataSource.getRepository(Cart);