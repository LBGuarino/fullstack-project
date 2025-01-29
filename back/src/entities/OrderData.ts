import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Order } from "./Order";
  
  @Entity({ name: "order_data" })
  export class OrderData {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;
  
    @Column({ name: "name", type: "varchar", length: 255, nullable: false })
    name: string;
  
    @Column({ name: "phone", type: "varchar", length: 20, nullable: false })
    phone: string;
  
    @Column({ name: "address", type: "varchar", length: 255, nullable: false })
    address: string;
  
    @Column({ name: "email", type: "varchar", length: 255, nullable: false })
    email: string;
  
    @Column({ name: "pickup_point", type: "int", nullable: true })
    pickupPoint?: number;
  
    @OneToOne(() => Order, (order) => order.orderData, { onDelete: "CASCADE" })
    @JoinColumn({ name: "order_id" })
    order: Order;
  }
  