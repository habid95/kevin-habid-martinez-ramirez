
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + '/../App/Models/*.entity.{js,ts}'],
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
      timezone: "America/Mexico_City"
    };
  }
}

export const typeConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configServer: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configServer),
  inject: [ConfigService],
};