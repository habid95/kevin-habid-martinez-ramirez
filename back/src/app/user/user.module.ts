import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../models/users.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Users]),
    ], 
    controllers: [UserController],
    providers: [UserService],
  })
  
  export class UserModule {}
