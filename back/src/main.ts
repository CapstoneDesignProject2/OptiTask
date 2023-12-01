import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // .env
  const port = configService.get<number>('PORT');

  app.enableCors();
  await app.listen(port);

  console.log(`Server is running on port ${port}`);
}
bootstrap();
