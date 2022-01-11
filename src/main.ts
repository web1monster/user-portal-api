import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const seedService = app.get(SeedService);

  await seedService.startSeed();

  const config = new DocumentBuilder()
    .setTitle('User Portal API')
    .setDescription('The User Portal API')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
