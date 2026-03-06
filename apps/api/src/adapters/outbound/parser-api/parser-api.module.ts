import { Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { ParserApiAdapter } from './parser-api.adapter';
import { TOKENS } from '../../../tokens';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: TOKENS.ParserApiLogging,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.ADAPTER).withHandleName(ParserApiAdapter.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.ParserApiPort,
      useFactory: (logger: LoggerPort, config: ConfigService) => new ParserApiAdapter(logger, config),
      inject: [TOKENS.ParserApiLogging, ConfigService],
    },
  ],
  exports: [TOKENS.ParserApiPort],
})
export class ParserApiModule {}
