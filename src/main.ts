import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = +configService.get<string>('PORT');
  await app.listen(port, () =>
    console.log(
      `🚀 nestjs server starting... http://localhost:${port}/graphql 🚀 `,
    ),
  );
}
bootstrap();
