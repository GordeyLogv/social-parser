import { Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { ExceptionFilterAdapter } from './exception-filter.adapter';

@Module({
  providers: [
    {
      provide: TOKENS.ExceptionFilterLogger,
      useFactory: (base: LoggerPort) =>
        base.withHandle(LoggerHandleEnum.EXCEPTION_FILTER).withHandleName(ExceptionFilterAdapter.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: ExceptionFilterAdapter,
      useFactory: (logger: LoggerPort) => new ExceptionFilterAdapter(logger),
      inject: [TOKENS.ExceptionFilterLogger],
    },
  ],
  exports: [ExceptionFilterAdapter],
})
export class ExceptionFilterModule {}
