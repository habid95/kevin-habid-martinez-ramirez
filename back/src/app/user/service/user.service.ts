import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/app/models/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users)
        private readonly _user: Repository<Users>,
    ) { }

    async createUser(User) {
        try {
            const newUser: any = this._user.create(User);

            newUser.Password = await newUser.hashPassword(newUser.Password);

            let user = await this._user.save(newUser);

            return {
                ok: true,
                data: user,
                msj: 'Usuario creado',
            }

        } catch (error) {

            return {
                ok: false,
                msj: 'Error al crear el usuario',
                error
            };
        }

    }

}
