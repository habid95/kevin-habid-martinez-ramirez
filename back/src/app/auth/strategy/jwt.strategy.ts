import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/app/models/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(Users)
    private readonly _user: Repository<Users>,
  ) {
    const configService = new ConfigService();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }



  async validate(payload) {
    const { phone } = payload;

    
    const user = await this._user.findOne({
      where: {
        phone: phone,
      }
    });

    if (!user) throw new UnauthorizedException('token invalid');

    return { user, payload };

  }

}
