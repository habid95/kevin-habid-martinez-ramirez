import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AccessTokens } from "./accessTokens.entity";

@Entity('user')
export class Users {

	@PrimaryGeneratedColumn("increment")
	@PrimaryColumn()
	Id: number;

	@Column({ type: 'varchar', length: 50 })
	name: string;

	@Column({ type: 'varchar', length: 45 })
	phone: string;

	@Column({ type: 'text', nullable: true })
	img_profile?: string;

	@Column({ type: 'varchar', length: 250 })
	Password: string;

	async hashPassword(password) {
		const passwordBcrypt = bcrypt.hashSync(password, 5);
		return passwordBcrypt;
	}

	@OneToOne(() => AccessTokens, (accessTokens) => accessTokens.user)
	token: AccessTokens

	// @Column({
	//     type: 'time with time zone', 
	//     default: Date.now()
	// })
	// createdAt: Date;

}