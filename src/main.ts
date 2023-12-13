import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties that are not in DTO
      forbidNonWhitelisted: true, // throw error if payload contains properties not in DTO
      transform: true, // transform payload to DTO
      transformOptions: {
        enableImplicitConversion: true, // transform payload to DTO
      },
    }),
  );

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${process.env.PORT}`);
}
bootstrap();
