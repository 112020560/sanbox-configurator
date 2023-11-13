import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3005;
  const app = await NestFactory.create(AppModule);
  //Middleware
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  //SWAGGER
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('Akros Sanbox RestApi')
    .setDescription('Akros Sanbox RestApi')
    .setVersion('1.0')
    .addTag('application')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port);
}
bootstrap();
