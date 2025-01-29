import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
  } from "typeorm";
  import { User } from "./User";
  import { CartItem } from "./CartItem";
  
  @Entity({ name: "carts" })
  export class Cart {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;
  
    @OneToOne(() => User, (user) => user.cart)
    @JoinColumn({name: "userid"})
    user: User;
  
    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
    items: CartItem[];
  }
  