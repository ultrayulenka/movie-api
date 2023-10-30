import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/exception-filter';
import { NextFunction } from 'express';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    next();
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
}
bootstrap();
