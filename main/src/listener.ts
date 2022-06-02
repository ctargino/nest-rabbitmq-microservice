import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://lrrawmtp:MHi1Ba0dEUVA8ZPDwvao_Xlo5M4-Slhl@hawk.rmq.cloudamqp.com/lrrawmtp'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen()

}

bootstrap();
