"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderCreate_middleware_1 = __importDefault(require("../middlewares/orderCreate.middleware"));
const order_controller_1 = require("../controllers/order.controller");
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const ordersRouter = (0, express_1.Router)();
ordersRouter.post("/", checkLogin_middleware_1.default, orderCreate_middleware_1.default, order_controller_1.createOrder);
exports.default = ordersRouter;
