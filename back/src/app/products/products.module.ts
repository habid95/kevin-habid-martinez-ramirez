import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { catalogProducts } from '../models/catalogProducts.entity';

@Module({  imports: [
  TypeOrmModule.forFeature([catalogProducts]),
],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
