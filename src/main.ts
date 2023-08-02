
import { configService } from './config/config.service';
import { initTelemetry } from './tracing'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

if (!configService.isOtelEnable()) {
  initTelemetry({
    appName: configService.getValue('APP_NAME'),
    svcName: configService.getValue('APP_SERVICE_NAME'),
    telemetryUrl: configService.getValue('OTEL_COLLECTOR_URL'),
  })
}

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });

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