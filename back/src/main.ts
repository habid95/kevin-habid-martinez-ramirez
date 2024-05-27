import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { ConfigService } from '@nestjs/config';


const configService = new ConfigService();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  const logger = new Logger();
  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET']
  })

  await app.listen(configService.get('WS_PORT'));

  logger.log(`Servidor corriendo en ${await app.getUrl()} : ${process.env.WS_PORT}`);
}
bootstrap();
