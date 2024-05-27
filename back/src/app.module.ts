import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeConfig } from './config/typeOrm.config';
import { ProductsModule } from './app/products/products.module';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { ShipsModule } from './app/ships/ships.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env' ,
    }),    
    TypeOrmModule.forRootAsync(typeConfig),
    ProductsModule,
    AuthModule,
    UserModule,
    ShipsModule,
    ProvidersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
