import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ShipsService } from '../services/ships.service';
import { JwtAuthGuard } from 'src/guards/jwy-guard.guard';

@Controller('ships')
export class ShipsController {

    constructor(
        private readonly _ShipsService: ShipsService
    ) { }


    @Get('getStates')
    async getStates() {
        return this._ShipsService.getStates();
    }

    @Post('rate')
    @UseGuards(JwtAuthGuard)
    async shipsRate(
        @Body() data,
        @Req() req
    ) {
        return this._ShipsService.shipsRate(req,data);
    }

    
    @Post('generate')
    @UseGuards(JwtAuthGuard)
    async generateShipsRate(
        @Body() data,
        @Req() req
    ) {
        return this._ShipsService.generateShipsRate(req,data);
    }

}
