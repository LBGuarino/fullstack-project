"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDataRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const OrderData_1 = require("../entities/OrderData");
exports.OrderDataRepository = dataSource_1.AppDataSource.getRepository(OrderData_1.OrderData);
