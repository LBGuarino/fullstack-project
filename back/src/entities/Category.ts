import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity({ name: 'categories' })

export class Category {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "name", type: "varchar", length: 255})
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}