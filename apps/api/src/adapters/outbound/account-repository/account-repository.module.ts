import { Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { AccountRepositoryAdapter } from './account-repository.adapter';
import { PrismaAdapter } from '../prisma/prisma.adapter';

@Module({
  exports: [AccountRepositoryAdapter],
  providers: [
    {
      provide: TOKENS.AccountRepositoryLogging,
      useFactory: (base: LoggerPort) =>
        base.withHandle(LoggerHandleEnum.REPOSITORY).withHandleName(AccountRepositoryAdapter.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.AccountRepositoryPort,
      useFactory: (logger: LoggerPort, prisma: PrismaAdapter) => new AccountRepositoryAdapter(logger, prisma),
      inject: [TOKENS.AccountRepositoryLogging, PrismaAdapter],
    },
  ],
})
export class AccountnRepositoryModule {}
