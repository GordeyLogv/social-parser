import { Global, Module } from '@nestjs/common';

import { LoggerAdapter } from './logger.adapter';
import { TOKENS } from '../../../composition';
import { LoggerAppEnum, LoggerHandleEnum } from '@app/core';

@Global()
@Module({
  providers: [
    {
      provide: TOKENS.LoggerPort,
      useFactory: () => new LoggerAdapter(LoggerAppEnum.API, LoggerHandleEnum.ADAPTER, LoggerAdapter.name),
    },
  ],
  exports: [TOKENS.LoggerPort],
})
export class LoggerModule {}
