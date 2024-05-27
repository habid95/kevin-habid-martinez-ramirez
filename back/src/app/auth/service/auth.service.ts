import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/app/models/users.entity';
import { AccessTokens } from 'src/app/models/accessTokens.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users)
        private readonly _user: Repository<Users>,
        @InjectRepository(AccessTokens)
        private readonly _AccessTokens: Repository<AccessTokens>,
        private _jwtService: JwtService,
    ) { }



    async singIn(credentials) {
        try {

            const Password: string = credentials.Password;

            const name: string = credentials.name;

            let user = await this._user.findOne({
                where: {
                    name
                }
            })

            if (!user) {
                return {
                    ok: false,
                    msj: 'error no coiciden las credenciales',
                    data: []
                };
            }


            const MatchPassword = await bcrypt.compare(Password, user['Password']);
            if (!MatchPassword) {
                return {
                    ok: false,
                    msj: 'error no coiciden las credenciales',
                    credentials
                };
            }


            delete user['Password']
            let token = await this.getToken(user);

            let updateToken = await this._AccessTokens.findOne({
                where: { user: user }
            })

            if (updateToken) {
                updateToken.token = token
                updateToken = await this._AccessTokens.save(updateToken)
            } else {

                updateToken = await this._AccessTokens.save({ token: token, user })
            }


            return {
                ok: true,
                user,
                token,
                updateToken
            };

        } catch (error) {
            return {
                ok: false,
                msj: 'Error al iniciar sesion',
                error
            };
        }
    }

    async getToken(user) {
        return this._jwtService.sign({
            name: user.name,
            phone: user.phone,
        }, { expiresIn: "8h", secret: process.env.JWT_SECRET })
    }

    async validateToken(req) {

        const { user, headers } = req

        const token = headers.authorization.split(' ');

        const userValidate = await this._user.findOne({
            relations: ['token'],
            where: {
                phone: user.phone,
            }
        });


        if(token[1] === userValidate.token.token){
            return { 
                ok: true,
                data: userValidate,
                msj: 'token ok'
             };

        }else {
            return {
                ok: false,
                msj: 'error no coiciden las credenciales',
                data: userValidate.token.token
            };
        }

    }


}
