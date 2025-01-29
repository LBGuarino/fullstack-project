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
const errors_1 = require("../utils/errors");
const products_service_1 = require("../services/products.service");
const validateOrderFields = (req, res, next) => {
    const { products } = req.body;
    if (!products.length)
        next(new errors_1.ClientError("Order must have an array of products"));
    if (!products || products.length === 0)
        return next(new errors_1.ClientError("Order must have at least one item"));
    next();
};
const validateItemsExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const { products } = req.body;
    try {
        for (var _d = true, products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), _a = products_1_1.done, !_a; _d = true) {
            _c = products_1_1.value;
            _d = false;
            const item = _c;
            const exists = yield (0, products_service_1.checkProductExists)(item.productId);
            if (!exists)
                return next(new errors_1.ClientError("One or more items do not exist in the database"));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = products_1.return)) yield _b.call(products_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    next();
});
exports.default = [validateOrderFields, validateItemsExist];
