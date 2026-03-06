import { Global, Module } from '@nestjs/common';

import { LoggerAppEnum, LoggerHandleEnum } from '@app/core';

import { TOKENS } from '../../../tokens';
import { LoggerAdapter } from './logger.adapter';

@Global()
@Module({
  providers: [
    {
      provide: TOKENS.LoggerPort,
      useFactory: () => new LoggerAdapter(LoggerAppEnum.PARSER, LoggerHandleEnum.ADAPTER, LoggerAdapter.name),
    },
  ],
  exports: [TOKENS.LoggerPort],
})
export class LoggerModule {}
