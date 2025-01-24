import { AppDataSource } from "../config/dataSource";
import { OrderProduct } from "../entities/OrderProduct";

export const OrderProductRepository = AppDataSource.getRepository(OrderProduct);
