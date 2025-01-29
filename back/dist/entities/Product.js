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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const CartItem_1 = require("./CartItem");
const OrderProduct_1 = require("./OrderProduct");
const slugify_1 = __importDefault(require("slugify"));
let Product = class Product {
    generateSlug() {
        if (this.name) {
            this.slug = (0, slugify_1.default)(this.name, {
                lower: true,
                strict: true,
            });
        }
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description", type: "text" }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "price", type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "stock", type: "int" }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id", type: "int" }),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.products, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", Category_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CartItem_1.CartItem, (cartItem) => cartItem.product),
    __metadata("design:type", Array)
], Product.prototype, "cartItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderProduct_1.OrderProduct, (orderProduct) => orderProduct.product),
    __metadata("design:type", Array)
], Product.prototype, "orderProducts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "slug", type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "generateSlug", null);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ name: "products" })
], Product);
