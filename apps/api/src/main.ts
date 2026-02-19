import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConsoleLogger } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'API',
      timestamp: true,
    }),
  });

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((e) => console.log(e));
