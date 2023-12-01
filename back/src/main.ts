import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // .env

async function bootstrap() {
	const configService = new ConfigService();
  	const app = await NestFactory.create(AppModule);
  	const port = configService.get<number>('PORT');
	app.enableCors();
  	await app.listen(3000);
 	console.log(`Server is running on port ${port}`);
}
bootstrap();
