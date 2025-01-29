"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const OrderData_1 = require("./OrderData");
const OrderProduct_1 = require("./OrderProduct");
// status: pending, approved, rejected
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "status", type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.orders, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "payment_method_id", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethodId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => OrderData_1.OrderData, (orderData) => orderData.order, { cascade: true }),
    __metadata("design:type", OrderData_1.OrderData)
], Order.prototype, "orderData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderProduct_1.OrderProduct, (orderProduct) => orderProduct.order, { cascade: true }),
    __metadata("design:type", Array)
], Order.prototype, "orderProducts", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: "orders" })
], Order);
