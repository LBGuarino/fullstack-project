import { AppDataSource } from "../config/dataSource";
import { OrderData } from "../entities/OrderData";

export const OrderDataRepository = AppDataSource.getRepository(OrderData);
