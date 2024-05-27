import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from 'src/guards/jwy-guard.guard';
import { authSchema } from '../dto/auth.dto';
import { error } from 'console';

@Controller('auth')
export class AuthController {
    constructor(private readonly _readonly: AuthService) { }


  @Post()
  async singIn(
    @Body() loginUser
  ) {

    const validation = authSchema.validate(loginUser,{abortEarly: false})

    if(validation.error){
        const errorMessages = validation.error.details.map(
            (error) => error.message
        )
        return {
            msj: 'Error de validacion',
            erros: errorMessages,
        }
    }

    return await this._readonly.singIn(loginUser);
  }


  @Get('validateToken')
  @UseGuards(JwtAuthGuard)
  async validate(
    @Req() req
  ) {
    return this._readonly.validateToken(req)
  }
}
