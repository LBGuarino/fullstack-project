import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity({ name: "order_products" })
export class OrderProduct {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ name: "quantity", type: "int" })
  quantity: number;
}
