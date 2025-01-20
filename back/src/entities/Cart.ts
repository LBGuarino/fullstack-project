import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
  } from "typeorm";
  import { User } from "./User";
  import { CartItem } from "./CartItem";
  
  @Entity({ name: "carts" })
  export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => User, (user) => user.cart)
    user: User;
  
    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
    items: CartItem[];
  }
  