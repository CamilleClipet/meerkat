import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only your Next.js frontend to access the API
    methods: 'GET,POST,PATCH,DELETE', // Allow specific methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
