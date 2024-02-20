import { NestFactory } from '@nestjs/core';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';

// project imports
import { AppModule } from './app.module';

// Конфигурация микросервиса users
const transportOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.USERS_HOST || '127.0.0.1',
    port: +process.env.USERS_PORT || 3040,
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
