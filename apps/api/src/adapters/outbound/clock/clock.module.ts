import { Global, Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { ClockAdapter } from './clock.adapter';

import { TOKENS } from '../../../tokens';

@Global()
@Module({
  providers: [
    {
      provide: TOKENS.ClockLogging,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.ADAPTER).withHandleName(ClockAdapter.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.ClockPort,
      useFactory: (logger: LoggerPort) => new ClockAdapter(logger),
      inject: [TOKENS.ClockLogging],
    },
  ],
  exports: [TOKENS.ClockPort],
})
export class ClockModule {}
