import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Order } from "../entities/Order";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";
import { CartItem } from "../entities/CartItem";
import { OrderData } from "../entities/OrderData";
import { OrderProduct } from "../entities/OrderProduct";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  // dropSchema: true,
  logging: true,
  entities: [User, Credential, Order, OrderData, OrderProduct, Product, Category, Cart, CartItem],
  subscribers: [],
  migrations: ['src/migration/**/*.ts'],
});
