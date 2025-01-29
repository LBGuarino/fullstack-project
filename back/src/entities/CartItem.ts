import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    JoinColumn,
  } from "typeorm";
  import { Cart } from "./Cart";
  import { Product } from "./Product";
  
  @Entity({ name: "cart_items" })
  export class CartItem {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;
  
    @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: "CASCADE" })
    @JoinColumn({name: "cart_id"})
    cart: Cart;
  
    @ManyToOne(() => Product, (product) => product.cartItems, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id" })
    product: Product;
  
    @Column({ type: "int", name: "quantity" })
    quantity: number;
  }
  