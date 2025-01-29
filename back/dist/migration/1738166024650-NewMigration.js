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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewMigration1738166024650 = void 0;
class NewMigration1738166024650 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Crear tabla credentials
            yield queryRunner.query(`
      CREATE TABLE credentials (
        id SERIAL PRIMARY KEY,
        password VARCHAR(255) NOT NULL
      );
    `);
            // Crear tabla users sin la clave foránea fk_user_cart
            yield queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        role VARCHAR(20) DEFAULT 'user',
        credential_id INTEGER UNIQUE,
        cart_id INTEGER UNIQUE,
        CONSTRAINT fk_user_credential FOREIGN KEY (credential_id) REFERENCES credentials(id) ON DELETE CASCADE
        -- No se agrega fk_user_cart aquí para evitar la dependencia circular
      );
    `);
            // Crear tabla carts con la clave foránea fk_cart_user
            yield queryRunner.query(`
      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE,
        CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
            // Agregar la clave foránea fk_user_cart a la tabla users
            yield queryRunner.query(`
      ALTER TABLE users
      ADD CONSTRAINT fk_user_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE;
    `);
            // Crear el resto de las tablas
            yield queryRunner.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);
            yield queryRunner.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INTEGER NOT NULL,
        image VARCHAR(255) NOT NULL,
        category_id INTEGER NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      );
    `);
            yield queryRunner.query(`
      CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        CONSTRAINT fk_cartItem_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
        CONSTRAINT fk_cartItem_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);
            yield queryRunner.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(50) NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT NOW(),
        user_id INTEGER NOT NULL,
        payment_method_id VARCHAR(255) NOT NULL,
        CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
            yield queryRunner.query(`
      CREATE TABLE order_data (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        pickup_point INTEGER NULL,
        order_id INTEGER UNIQUE NOT NULL,
        CONSTRAINT fk_orderData_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `);
            yield queryRunner.query(`
      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        CONSTRAINT fk_orderProduct_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        CONSTRAINT fk_orderProduct_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Eliminar la clave foránea fk_user_cart primero
            yield queryRunner.query(`
      ALTER TABLE users DROP CONSTRAINT fk_user_cart;
    `);
            // Eliminar las tablas en orden inverso
            yield queryRunner.query(`
      DROP TABLE order_products;
      DROP TABLE order_data;
      DROP TABLE orders;
      DROP TABLE cart_items;
      DROP TABLE products;
      DROP TABLE categories;
      DROP TABLE users;
      DROP TABLE carts;
      DROP TABLE credentials;
    `);
        });
    }
}
exports.NewMigration1738166024650 = NewMigration1738166024650;
