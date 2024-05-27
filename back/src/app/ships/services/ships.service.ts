import { Injectable } from '@nestjs/common';
import fs = require('fs');
import path = require('path');
import * as statesFile from '../states.json';
import { HttpCustomService } from 'src/providers/http/http.service';
import { catalogProducts } from 'src/app/models/catalogProducts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShipsService {

    constructor(
        private readonly _AxiosHttpCustomService: HttpCustomService,
        @InjectRepository(catalogProducts)
        private readonly _catalogProducts: Repository<catalogProducts>,

    ) { }

    async generateShipsRate(req, data) {
        const settings = {
            "printFormat": "PDF",
            "printSize": "STOCK_4X6",
            "comments": "comentarios de el envío"
        }

        return await this.shipsRate(req, data , 'ship/generate/', settings)
    }

    async shipsRate(req, data ,url='ship/rate/',settings = {}) {
        try {
            const { user: use } = req
            const { user } = use
            const { destination, idProduct } = data




            let packages = await this.getProducts(idProduct)
            let bodyData = await this.generateBody(destination,user)

            const config = {
                method: 'post',
                url: process.env.API_ENVIA + url,
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN_ENVIA}`
                },
                data: {
                    ...bodyData,
                    packages: [packages],
                    settings
                },
            };



            let response = await this._AxiosHttpCustomService.request(config)



            return {
                ok: true,
                msj: 'Cotizacion ha sido exitosa',
                data: { ...response },
            }

        } catch (error) {
        }
    }

    async generateBody(destination,user) {
        destination.name = user.name
        destination.number = destination.number.toString()
        destination.postalCode = destination.postalCode.toString()
        
        const origin = statesFile.origin
        const shipment = statesFile.shipment

        return {
            destination,
            shipment,
            origin
        }

    }

    async getProducts(Id) {
        let product = await this._catalogProducts.findOne({ where: { Id } })

        return {
            "content": product.name,
            "amount": 1,
            "type": "box",
            "weight": 1,
            "dimensions": {
                "length": product.length,
                "width": product.width,
                "height": product.height
            }

        }
    }

    async getStates() {
        return {
            ok: true,
            msj: 'Estados encontrados',
            data: statesFile.data,
        };
    }




}
