import { Module } from '@nestjs/common';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../models/users.entity';
import { AccessTokens } from '../models/accessTokens.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users,AccessTokens]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: '20h'
                    },
                }
            },
        })
        ,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
