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
exports.removeAllFromCartService = exports.removeFromCartService = exports.addToCartService = exports.getCartService = exports.loginUserService = exports.registerUserService = exports.checkUserExists = void 0;
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
const credential_service_1 = require("./credential.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cart_repository_1 = require("../repositories/cart.repository");
const product_repository_1 = require("../repositories/product.repository");
const cartItem_repository_1 = require("../repositories/cartItem.repository");
const checkUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.UserRepository.findOneBy({ email });
    return !!user;
});
exports.checkUserExists = checkUserExists;
const registerUserService = (registerUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.UserRepository.create(registerUserDto);
    yield user_repository_1.UserRepository.save(user);
    const credential = yield (0, credential_service_1.createCredentialService)({
        password: registerUserDto.password,
    });
    user.credential = credential;
    yield user_repository_1.UserRepository.save(user);
    const cart = cart_repository_1.CartRepository.create({ id: user.id, user });
    yield cart_repository_1.CartRepository.save(cart);
    return user;
});
exports.registerUserService = registerUserService;
const loginUserService = (loginUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.UserRepository.findOne({
        where: {
            email: loginUserDto.email,
        },
        relations: ["credential", "orders"],
    });
    if (!user)
        throw new Error("User not found");
    if (yield (0, credential_service_1.checkPasswordService)(loginUserDto.password, user.credential.password)) {
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return {
            user,
            token,
        };
    }
    else {
        throw new errors_1.ClientError("Invalid email or password");
    }
});
exports.loginUserService = loginUserService;
const getCartService = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield cart_repository_1.CartRepository.findOne({
        where: { user: { id: userId } },
        relations: ["items", "items.product"],
    });
    if (!userCart) {
        throw new errors_1.ClientError("Cart not found");
    }
    return userCart;
});
exports.getCartService = getCartService;
const addToCartService = ({ userId, productId, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield cart_repository_1.CartRepository.findOne({
        where: { user: { id: userId } },
        relations: ["items", "items.product"],
    });
    if (!userCart) {
        throw new errors_1.ClientError("Cart not found");
    }
    const product = yield product_repository_1.ProductRepository.findOne({
        where: { id: productId },
        relations: ["category"],
    });
    if (!product) {
        throw new errors_1.ClientError("Product not found");
    }
    let cartItem = userCart.items.find((item) => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    }
    else {
        cartItem = cartItem_repository_1.CartItemRepository.create({
            cart: userCart,
            product,
            quantity,
        });
        userCart.items.push(cartItem);
    }
    yield cartItem_repository_1.CartItemRepository.save(cartItem);
    return userCart;
});
exports.addToCartService = addToCartService;
const removeFromCartService = ({ productId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield cart_repository_1.CartRepository.findOne({
        where: { user: { id: userId } },
        relations: ["items", "items.product"],
    });
    if (!userCart) {
        throw new errors_1.ClientError("Cart not found");
    }
    const cartItem = userCart.items.find((item) => item.product.id === productId);
    if (!cartItem) {
        throw new errors_1.ClientError("Product not in cart");
    }
    yield cartItem_repository_1.CartItemRepository.remove(cartItem);
    return userCart;
});
exports.removeFromCartService = removeFromCartService;
const removeAllFromCartService = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield cart_repository_1.CartRepository.findOne({
        where: { user: { id: userId } },
        relations: ["items", "items.product"],
    });
    if (!userCart) {
        throw new errors_1.ClientError("Cart not found");
    }
    yield cartItem_repository_1.CartItemRepository.remove(userCart.items);
    return userCart;
});
exports.removeAllFromCartService = removeAllFromCartService;
