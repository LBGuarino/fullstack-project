import { MigrationInterface, QueryRunner } from "typeorm";

export class ManualMigration1738158819257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        role VARCHAR(20) DEFAULT 'user'
      );

      CREATE TABLE credentials (
        id SERIAL PRIMARY KEY,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        userId INTEGER UNIQUE,
        CONSTRAINT fk_cart_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INTEGER NOT NULL,
        image VARCHAR(255) NOT NULL,
        categoryId INTEGER NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        CONSTRAINT fk_product_category FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
      );

      CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        cartId INTEGER NOT NULL,
        productId INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        CONSTRAINT fk_cartItem_cart FOREIGN KEY (cartId) REFERENCES carts(id) ON DELETE CASCADE,
        CONSTRAINT fk_cartItem_product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(50) NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT NOW(),
        userId INTEGER NOT NULL,
        paymentMethodId VARCHAR(255) NOT NULL,
        CONSTRAINT fk_order_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE order_data (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        pickupPoint INTEGER NULL,
        orderId INTEGER UNIQUE NOT NULL,
        CONSTRAINT fk_orderData_order FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
      );

      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        orderId INTEGER NOT NULL,
        productId INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        CONSTRAINT fk_orderProduct_order FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
        CONSTRAINT fk_orderProduct_product FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE order_products;
      DROP TABLE order_data;
      DROP TABLE orders;
      DROP TABLE cart_items;
      DROP TABLE products;
      DROP TABLE categories;
      DROP TABLE carts;
      DROP TABLE credentials;
      DROP TABLE users;
    `);
  }
}
