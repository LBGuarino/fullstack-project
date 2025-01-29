"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preLoadCategories = void 0;
const dataSource_1 = require("../config/dataSource");
const Category_1 = require("../entities/Category");
const category_respository_1 = require("../repositories/category.respository");
const categoriesToPreLoad = [
    { name: 'Smartphones' },
    { name: 'Laptops' },
    { name: 'Tablets' },
    { name: 'Headphones' },
    { name: 'Displays' },
    { name: 'Watches' },
    { name: 'Accessories' }
];
const preLoadCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_respository_1.CategoryRepository.find();
    if (!categories.length)
        yield dataSource_1.AppDataSource.createQueryBuilder().insert().into(Category_1.Category).values(categoriesToPreLoad).execute();
    console.log('Categories preloaded');
});
exports.preLoadCategories = preLoadCategories;
