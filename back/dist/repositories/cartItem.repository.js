"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const CartItem_1 = require("../entities/CartItem");
exports.CartItemRepository = dataSource_1.AppDataSource.getRepository(CartItem_1.CartItem);
