import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'; // Importa el paquete 'cors'
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200', 'https://seg.administracionpublica-uv.cl'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization', // Include Authorization
    credentials: true,
  })); 
  app.setGlobalPrefix("api/");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              //Usuario envía cosas que no corresponda
      forbidNonWhitelisted: true,   //No permite enviar cosas que no correspondan
      transform: true,              //Transforma los datos que recibe a los tipos que se le indican
    })
  );
  
  await app.listen(process.env.PORT || 4000);
}
bootstrap();