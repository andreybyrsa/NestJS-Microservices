import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

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
