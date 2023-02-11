import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './utils/config';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)

  await app.listen(PORT);
}
bootstrap();
