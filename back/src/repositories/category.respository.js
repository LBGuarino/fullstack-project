"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const Category_1 = require("../entities/Category");
exports.CategoryRepository = dataSource_1.AppDataSource.getRepository(Category_1.Category);
