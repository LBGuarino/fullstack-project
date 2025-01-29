import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "credentials" })
export class Credential {
    @PrimaryGeneratedColumn({name: "credentialid"})
    id: number;

    @Column()
    password: string;
}
