import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Credential } from "./Credential";
  import { Order } from "./Order";
  import { Cart } from "./Cart";
  
  enum Role {
    ADMIN = "admin",
    USER = "user",
  }
  
  @Entity({ name: "users" })
  export class User {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;
  
    @Column({ name: "name", type: "varchar", length: 255, nullable: false })
    name: string;
  
    @Column({ name: "email", type: "varchar", length: 255, unique: true, nullable: false })
    email: string;
  
    @Column({ name: "address", type: "varchar", length: 255, nullable: true })
    address: string;
  
    @Column({ name: "phone", type: "varchar", length: 20, nullable: true })
    phone: string;
  
    @Column({
      name: "role",
      type: "enum",
      enum: Role,
      default: Role.USER,
    })
    role: Role;
  
    @OneToOne(() => Credential, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "credential_id" })
    credential: Credential;
  
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
  
    @OneToOne(() => Cart, (cart) => cart.user, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "cart_id" })
    cart: Cart;
  }
  