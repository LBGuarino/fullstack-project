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
exports.OrderData = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("./Order");
let OrderData = class OrderData {
};
exports.OrderData = OrderData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], OrderData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], OrderData.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone", type: "varchar", length: 20, nullable: false }),
    __metadata("design:type", String)
], OrderData.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address", type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], OrderData.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email", type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], OrderData.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pickup_point", type: "int", nullable: true }),
    __metadata("design:type", Number)
], OrderData.prototype, "pickupPoint", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Order_1.Order, (order) => order.orderData, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "order_id" }),
    __metadata("design:type", Order_1.Order)
], OrderData.prototype, "order", void 0);
exports.OrderData = OrderData = __decorate([
    (0, typeorm_1.Entity)({ name: "order_data" })
], OrderData);
