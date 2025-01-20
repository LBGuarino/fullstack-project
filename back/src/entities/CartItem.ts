import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
  } from "typeorm";
  import { Cart } from "./Cart";
  import { Product } from "./Product";
  
  @Entity({ name: "cart_items" })
  export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: "CASCADE" })
    cart: Cart;
  
    @ManyToOne(() => Product, (product) => product.cartItems, { onDelete: "CASCADE" })
    product: Product;
  
    @Column({ type: "int" })
    quantity: number;
  }
  