import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity('access_tokens')
export class AccessTokens {


    @PrimaryGeneratedColumn("increment")
    @PrimaryColumn()
    Id: number;

    @Column({ type: 'text'})
    token: string;

    @OneToOne(() => Users, user => user.token)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "Id"
    })
    user?: Users;

}
