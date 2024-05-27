import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('catalog_products')
export class catalogProducts {

    @PrimaryGeneratedColumn("increment")
	@PrimaryColumn()
	Id: number;

    @Column({ type: 'varchar', length: 100 })
	name: string;

    @Column({ type: 'varchar', length: 250 })
	description: string;

	@Column({ type: "int" })
	height: number;

    @Column({ type: "int" })
	length: number;

    @Column({ type: "int" })
	width: number;

    @Column({ type: 'bool' })
    status: boolean;
}
