"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const Cart_1 = require("../entities/Cart");
exports.CartRepository = dataSource_1.AppDataSource.getRepository(Cart_1.Cart);
