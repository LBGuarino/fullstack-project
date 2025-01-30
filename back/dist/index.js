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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const dataSource_1 = require("./config/dataSource");
const preLoadCategories_1 = require("./helpers/preLoadCategories");
const preLoadProducts_1 = require("./helpers/preLoadProducts");
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Initializing server");
    yield dataSource_1.AppDataSource.initialize();
    console.log("Database initialized");
    yield (0, preLoadCategories_1.preLoadCategories)();
    yield (0, preLoadProducts_1.preLoadProducts)();
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Server running on port ${envs_1.PORT}`);
    });
});
initialize();
