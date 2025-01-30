"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const OrderProduct_1 = require("../entities/OrderProduct");
exports.OrderProductRepository = dataSource_1.AppDataSource.getRepository(OrderProduct_1.OrderProduct);
