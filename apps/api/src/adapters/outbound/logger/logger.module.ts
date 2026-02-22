import { Global, Module } from '@nestjs/common';

import { LoggerAppEnum, LoggerHandleEnum } from '@app/core';

import { LoggerAdapter } from './logger.adapter';

import { TOKENS } from '../../../tokens';
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
