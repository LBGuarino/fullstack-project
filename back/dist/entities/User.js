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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Credential_1 = require("./Credential");
const Order_1 = require("./Order");
const Cart_1 = require("./Cart");
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role || (Role = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email", type: "varchar", length: 255, unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone", type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "role",
        type: "enum",
        enum: Role,
        default: Role.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Credential_1.Credential, { cascade: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "credential_id" }),
    __metadata("design:type", Credential_1.Credential)
], User.prototype, "credential", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, (order) => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Cart_1.Cart, (cart) => cart.user, { cascade: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "cart_id" }),
    __metadata("design:type", Cart_1.Cart)
], User.prototype, "cart", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: "users" })
], User);
