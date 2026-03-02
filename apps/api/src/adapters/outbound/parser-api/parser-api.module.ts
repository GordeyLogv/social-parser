import { Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { ParserApiAdapter } from './parser-api.adapter';
import { TOKENS } from '../../../tokens';

@Module({
  providers: [
    {
      provide: TOKENS.ParserApiLogging,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.ADAPTER).withHandleName(ParserApiAdapter.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.ParserApiPort,
      useFactory: (logger: LoggerPort) => new ParserApiAdapter(logger),
      inject: [TOKENS.ParserApiLogging],
    },
  ],
  exports: [ParserApiAdapter],
})
export class ParserApiModule {}
