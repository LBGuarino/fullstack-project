import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1738166024650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Crear tablas sin claves foráneas circulares
    await queryRunner.query(`
      CREATE TABLE credentials (
        id SERIAL PRIMARY KEY,
        password VARCHAR(255) NOT NULL
      );
    `);

    await queryRunner.query(`
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
        -- Nota: No agregamos fk_user_cart aquí para evitar la dependencia circular
      );
    `);

    await queryRunner.query(`
      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE,
        CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // 2. Agregar la clave foránea faltante en users para cart_id
    await queryRunner.query(`
      ALTER TABLE users
      ADD CONSTRAINT fk_user_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE;
    `);

    // Crear el resto de las tablas
    await queryRunner.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    await queryRunner.query(`
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

    await queryRunner.query(`
      CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        CONSTRAINT fk_cartItem_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
        CONSTRAINT fk_cartItem_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(50) NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT NOW(),
        user_id INTEGER NOT NULL,
        payment_method_id VARCHAR(255) NOT NULL,
        CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
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

    await queryRunner.query(`
      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        CONSTRAINT fk_orderProduct_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        CONSTRAINT fk_orderProduct_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar las restricciones de claves foráneas primero
    await queryRunner.query(`
      ALTER TABLE users DROP CONSTRAINT fk_user_cart;
    `);

    // Luego, eliminar las tablas en el orden inverso de creación
    await queryRunner.query(`
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
  }
}
