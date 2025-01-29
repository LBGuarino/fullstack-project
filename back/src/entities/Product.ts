import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { CartItem } from "./CartItem";
import { OrderProduct } from "./OrderProduct";
import slugify from "slugify";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @Column({ name: "description", type: "text" })
  description: string;

  @Column({ name: "price", 
    type: "decimal", 
    precision: 10, 
    scale: 2,
    transformer: {  // ← Required for decimal handling
      from: (value: string) => parseFloat(value),
      to: (value: number) => value
    }
  })
  price: number;

  @Column({ name: "stock", type: "int" })
  stock: number;

  @Column({ name: "image", type: "varchar", length: 255 })
  image: string;
  
  @ManyToOne(() => Category, (category) => category.products, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  @Column({ name: "slug", type: "varchar", length: 255, unique: true })
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, { 
        lower: true,
        strict: true,
      });
    }
  }
}
