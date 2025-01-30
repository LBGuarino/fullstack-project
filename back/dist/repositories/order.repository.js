"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const Order_1 = require("../entities/Order");
exports.OrderRepository = dataSource_1.AppDataSource.getRepository(Order_1.Order);
