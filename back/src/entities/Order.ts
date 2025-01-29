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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userid" })
  user: User;

  @Column({ nullable: false })
  paymentmethodid: string;

  @OneToOne(() => OrderData, (orderData) => orderData.order, { cascade: true })
  orderData: OrderData;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { cascade: true })
  orderProducts: OrderProduct[];
}
