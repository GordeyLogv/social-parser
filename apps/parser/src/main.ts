import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';

import { ZodValidationPipe } from 'nestjs-zod';

import { LoggerPort } from '@app/core';

import { AppModule } from './app/app.module';
import { ExceptionFilterAdapter } from './adapters';
import { TOKENS } from './tokens';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Parser',
      timestamp: true,
    }),
  });

  app.useGlobalPipes(new ZodValidationPipe());

  app.useGlobalFilters(new ExceptionFilterAdapter(app.get<LoggerPort>(TOKENS.ExceptionFilterLogger)));

  await app.listen(process.env.PORT ?? 3500);
}
bootstrap().catch((e) => console.log(e));
