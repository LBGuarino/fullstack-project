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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderService = void 0;
const order_repository_1 = require("../repositories/order.repository");
const orderData_repository_1 = require("../repositories/orderData.repository");
const orderProduct_repository_1 = require("../repositories/orderProduct.repository");
const product_repository_1 = require("../repositories/product.repository");
const user_repository_1 = require("../repositories/user.repository");
const createOrderService = (createOrderDto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const productsF = [];
    try {
        for (var _d = true, _e = __asyncValues(createOrderDto.products), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
            _c = _f.value;
            _d = false;
            const item = _c;
            const product = yield product_repository_1.ProductRepository.findOneBy({ id: item.productId });
            if (!product)
                throw new Error("Product not found");
            productsF.push({ product, quantity: item.quantity });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    const userF = yield user_repository_1.UserRepository.findOneBy({ id: createOrderDto.userId });
    if (!userF)
        throw new Error("User not found");
    const newOrderData = orderData_repository_1.OrderDataRepository.create();
    newOrderData.name = createOrderDto.orderData.name;
    newOrderData.phone = createOrderDto.orderData.phone;
    newOrderData.address = `${createOrderDto.orderData.address.street}, ${createOrderDto.orderData.address.city}, ${createOrderDto.orderData.address.postalCode}, ${createOrderDto.orderData.address.country}`;
    newOrderData.email = createOrderDto.orderData.email;
    newOrderData.pickupPoint = createOrderDto.orderData.pickupPoint;
    const newOrder = order_repository_1.OrderRepository.create();
    newOrder.status = "approved";
    newOrder.date = new Date();
    newOrder.paymentMethodId = createOrderDto.paymentMethodId;
    newOrder.user = userF;
    newOrder.orderData = newOrderData;
    newOrder.orderProducts = productsF.map(({ product, quantity }) => {
        const orderProduct = orderProduct_repository_1.OrderProductRepository.create();
        orderProduct.product = product;
        orderProduct.quantity = quantity;
        return orderProduct;
    });
    const savedOrder = yield order_repository_1.OrderRepository.save(newOrder);
    return savedOrder;
});
exports.createOrderService = createOrderService;
