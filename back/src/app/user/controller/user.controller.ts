import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { userSchema } from '../dto/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ) { }

    @Post('')
    async createUser(
        @Body() user
    ) {
        const validation = userSchema.validate(user, { abortEarly: false })

        if (validation.error) {
            const errorMessages = validation.error.details.map(
                (error) => error.message
            )
            return {
                msj: 'Error de validacion',
                erros: errorMessages,
            }
        }

        return await this._userService.createUser(user);
    }

}
