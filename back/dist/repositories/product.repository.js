"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const Product_1 = require("../entities/Product");
exports.ProductRepository = dataSource_1.AppDataSource.getRepository(Product_1.Product);
