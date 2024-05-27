import { Module } from '@nestjs/common';
import { ShipsController } from './controller/ships.controller';
import { ShipsService } from './services/ships.service';
import { HttpCustomService } from 'src/providers/http/http.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { catalogProducts } from '../models/catalogProducts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([catalogProducts]),
  ],
  controllers: [ShipsController],
  providers: [ShipsService,HttpCustomService]
})
export class ShipsModule {}
