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
const express_1 = require("express");
const userRegister_middleware_1 = __importDefault(require("../middlewares/userRegister.middleware"));
const userLogin_middleware_1 = __importDefault(require("../middlewares/userLogin.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const order_repository_1 = require("../repositories/order.repository");
const usersRouter = (0, express_1.Router)();
usersRouter.post("/register", userRegister_middleware_1.default, user_controller_1.registerUser);
usersRouter.post("/logout", user_controller_1.logout);
usersRouter.post("/login", userLogin_middleware_1.default, user_controller_1.login);
usersRouter.get("/orders", checkLogin_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const orders = yield order_repository_1.OrderRepository.find({
        relations: ["orderProducts", "orderProducts.product"],
        where: { user: { id: userId } },
    });
    res.send(orders);
}));
usersRouter.get('/cart', checkLogin_middleware_1.default, user_controller_1.getCart);
usersRouter.post('/cart', checkLogin_middleware_1.default, user_controller_1.addToCart);
usersRouter.delete("/cart/:productId", checkLogin_middleware_1.default, user_controller_1.removeFromCart);
usersRouter.delete("/cart", checkLogin_middleware_1.default, user_controller_1.removeAllFromCart);
usersRouter.get("/session", user_controller_1.getSession);
exports.default = usersRouter;
