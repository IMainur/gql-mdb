import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const PORT = 4343
  await app.listen(PORT);
  logger.log('Running in Port'+' '+PORT);
}
bootstrap();
