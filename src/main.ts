import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './utils/config';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT);
}
bootstrap();
