import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly _ProductsService: ProductsService) { }

    @Get()
    async getall() {
        return this._ProductsService.getAllProducts();
    }

    @Get(':id')
    async getProduct(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this._ProductsService.getProduct(id);
    }

    @Post()
    async createProduct(
        @Req() req
    ) {
        return this._ProductsService.createProduct(req);
    }

    @Put('updateProduct/:id')
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() data
    ) {
        return await this._ProductsService.updateProduct(id, data);
    }

    @Delete('deleteProduct/:id')
    async deleteProduct(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this._ProductsService.deleteProduct(id);
    }

}
