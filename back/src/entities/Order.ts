import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { OrderData } from "./OrderData";
import { OrderProduct } from "./OrderProduct";

// status: pending, approved, rejected

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn({name: "id"})
  id: number;

  @Column({ name: "status", type: "varchar", length: 50 })
  status: string;

  @Column({ name: "date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" }) 
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "payment_method_id", type: "varchar", length: 255 })
  paymentMethodId: string;

  @OneToOne(() => OrderData, (orderData) => orderData.order, { cascade: true })
  orderData: OrderData;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { cascade: true })
  orderProducts: OrderProduct[];
}
