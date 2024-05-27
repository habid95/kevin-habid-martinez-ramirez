import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catalogProducts } from 'src/app/models/catalogProducts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(catalogProducts)
        private readonly _catalogProducts: Repository<catalogProducts>,
    ) { }

    async getProduct(Id) {
        try {

            let product = await this._catalogProducts.findOne({
                where:{
                    Id
                }
            });

            if(product){
                return {
                    ok: true,
                    data:product,
                    msj: 'Producto encontrado'
                }
            }

            return {
                ok:false,
                data:[],
                msj: 'Producto no existente'
            }

            
        } catch (error) {
            return {
                ok: false,
                msj: 'Error al buscar el producto',
                error
            }
        }
    }

    async getAllProducts() {
        try {

            let products = await this._catalogProducts.find({
                select:{
                    Id: true,
                    name: true,
                    description: true
                },
                where:{
                    status: true
                }
            });

            if (products.length < 1) {
                return {
                    data: products,
                    ok: true,
                    msj: 'No existen productos'
                }
            }

            return {
                data: products,
                ok: true,
                msj: 'Productos encontrados'
            }


        } catch (error) {
            return {
                ok: false,
                msj: 'Error al buscar los productos',
                error
            }
        }
    }

    async createProduct(req) {

        try {
            let product = this._catalogProducts.create(req.body);
            await this._catalogProducts.save(product);
            return {
                ok: true,
                msj: 'Producto creado',
                data: product
            }

        } catch (error) {

            return {
                ok: false,
                msj: 'Error al crear el producto',
                error
            }
        }
    }

    async updateProduct(Id, data) {
        try {

            let product = await this._catalogProducts.update(Id, data)

            if (product) return {
                OK: true,
                data: product,
                msj: 'Producto actualizado',
            }
            return {
                OK: false,
                data: product,
                msj: 'Error al modificar el producto'
            }

        } catch (error) {
            return {
                ok: false,
                msj: 'Error al actualizar el producto',
                error
            }
        }
    }

    async deleteProduct(Id) {
        try {
            
            let product = await this._catalogProducts.update(Id, {status: false})

            if (product) return {
                OK: true,
                data: product,
                msj: 'Producto eliminado',
            }
            return {
                OK: false,
                data: product,
                msj: 'Error al eliminar el producto'
            }

            
        } catch (error) {
            return {
                ok: false,
                msj: 'Error al eliminar el producto',
                error
            }
        }
    }
}
