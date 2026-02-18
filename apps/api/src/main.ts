import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'API',
      timestamp: true,
    }),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
