import { NestFactory } from '@nestjs/core';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';

// project imports
import { AppModule } from './app.module';

// Конфигурация микросервиса comments
const transportOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.COMMENTS_HOST || '127.0.0.1',
    port: +process.env.COMMENTS_PORT || 3050,
  },
};

async function runMicroservice() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    transportOptions,
  );

  await app.listen();
}

runMicroservice();
