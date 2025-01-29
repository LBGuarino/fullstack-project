import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity({ name: "order_data" })
export class OrderData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: true })
    pickupPoint?: number;

    @OneToOne(() => Order, (order) => order.orderData)
    @JoinColumn({ name: "orderid" })
    order: Order;
}