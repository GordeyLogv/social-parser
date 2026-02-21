import { Global, Module } from '@nestjs/common';

import { LoggerAdapter } from './logger.adapter';
import { TOKENS } from '../../../composition';

@Global()
@Module({
  providers: [
    {
      provide: TOKENS.LoggerPort,
      useClass: LoggerAdapter,
    },
  ],
  exports: [TOKENS.LoggerPort],
})
export class LoggerModule {}
