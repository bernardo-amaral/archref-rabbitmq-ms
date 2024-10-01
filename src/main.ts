import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const rabbitMqConfig = {
    transport: WebTransport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: ['error', 'warn'],
      ...rabbitMqConfig,
    },
  );
  await app.listen(3000);
}
bootstrap();
