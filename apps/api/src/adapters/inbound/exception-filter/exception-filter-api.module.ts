import { Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { ExceptionFilterApi } from './exception-filter-api';

import { TOKENS } from '../../../tokens';

@Module({
  providers: [
    {
      provide: TOKENS.ExceptionFilterApiLogging,
      useFactory: (base: LoggerPort) =>
        base.withHandle(LoggerHandleEnum.EXCEPTION_FILTER).withHandleName(ExceptionFilterApi.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: ExceptionFilterApi,
      useFactory: (logger: LoggerPort) => new ExceptionFilterApi(logger),
      inject: [TOKENS.ExceptionFilterApiLogging],
    },
  ],
  exports: [ExceptionFilterApi],
})
export class ExceptionFilterApiModule {}
