import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Merchant {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column()
    hint: string;

    @Column()
    status: boolean;
}
