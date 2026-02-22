import { Global, Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { PrismaAdapter } from './prisma.adapter';

import { TOKENS } from '../../../tokens';

@Global()
@Module({
  providers: [
    {
      provide: TOKENS.PrismaLogging,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.ADAPTER).withHandleName(PrismaAdapter.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: PrismaAdapter,
      useFactory: (logger: LoggerPort) => new PrismaAdapter(logger),
      inject: [TOKENS.PrismaLogging],
    },
  ],
  exports: [PrismaAdapter],
})
export class PrismaModule {}
