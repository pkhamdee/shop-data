import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Shop Data API')
      .setDescription('Shop Data API')
      .setVersion('1.0')
      .build());
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(configService.getPort());
}


bootstrap();
