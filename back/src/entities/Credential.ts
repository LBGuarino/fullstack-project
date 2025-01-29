import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "credentials" })
export class Credential {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({ name: "password", type: "varchar", length: 255 })
    password: string;
}
