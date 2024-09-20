import { NestFactory } from '@nestjs/core';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app =
      await NestFactory.createMicroservice<NestMicroserviceOptions>(AppModule);

    await app.listen();
    console.log('Microservice is listening');
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
