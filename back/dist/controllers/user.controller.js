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
exports.removeAllFromCart = exports.removeFromCart = exports.addToCart = exports.getCart = exports.logout = exports.getSession = exports.login = exports.registerUser = void 0;
const catchedController_1 = require("../utils/catchedController");
const user_service_1 = require("../services/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../config/envs");
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const isProduction = process.env.NODE_ENV === "production";
exports.registerUser = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, address, phone } = req.body;
    const newUser = yield (0, user_service_1.registerUserService)({
        email,
        password,
        name,
        address,
        phone,
    });
    res.status(201).send(newUser);
}));
exports.login = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_service_1.loginUserService)({ email, password });
    res.cookie('token', user.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
    });
    res.status(200).send({
        login: true,
        user: user.user,
    });
}));
exports.getSession = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        const decoded = jsonwebtoken_1.default.verify(token, envs_1.JWT_SECRET);
        const user = yield user_repository_1.UserRepository.findOne({
            where: { id: decoded.userId },
            relations: ["orders"],
        });
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired session" });
    }
}));
exports.logout = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token', { path: '/' });
    return res.json({ message: 'Logout successful' });
}));
exports.getCart = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    if (!userId) {
        throw new errors_1.ClientError("User not authenticated", 401);
    }
    const cart = yield (0, user_service_1.getCartService)({ userId });
    res.status(200).send(cart);
}));
exports.addToCart = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    const { productId, quantity } = req.body;
    if (!userId) {
        throw new errors_1.ClientError("User not authenticated", 401);
    }
    const cart = yield (0, user_service_1.addToCartService)({ userId, productId, quantity });
    res.status(200).send(cart);
}));
exports.removeFromCart = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
    const productId = parseInt(req.params.productId, 10);
    if (!userId) {
        throw new errors_1.ClientError("User not authenticated", 401);
    }
    if (isNaN(productId)) {
        throw new errors_1.ClientError("Invalid product ID", 400);
    }
    const cart = yield (0, user_service_1.removeFromCartService)({ productId, userId });
    res.status(200).send(cart);
}));
exports.removeAllFromCart = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
    if (!userId) {
        throw new errors_1.ClientError("User not authenticated", 401);
    }
    const cart = yield (0, user_service_1.removeAllFromCartService)({ userId });
    res.status(200).send(cart);
}));
