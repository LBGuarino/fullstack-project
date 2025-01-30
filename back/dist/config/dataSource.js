"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Order_1 = require("../entities/Order");
const Category_1 = require("../entities/Category");
const Product_1 = require("../entities/Product");
const Cart_1 = require("../entities/Cart");
const CartItem_1 = require("../entities/CartItem");
const OrderData_1 = require("../entities/OrderData");
const OrderProduct_1 = require("../entities/OrderProduct");
const isProd = process.env.NODE_ENV === "production";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USER,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: false,
    // dropSchema: true,
    logging: true,
    entities: [User_1.User, Credential_1.Credential, Order_1.Order, OrderData_1.OrderData, OrderProduct_1.OrderProduct, Product_1.Product, Category_1.Category, Cart_1.Cart, CartItem_1.CartItem],
    subscribers: [],
    migrations: [isProd ? "dist/migration/*.js" : "src/migration/*.ts"],
});
