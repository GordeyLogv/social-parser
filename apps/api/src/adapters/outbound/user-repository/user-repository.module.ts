import { Module } from '@nestjs/common';

import { LoggerHandleEnum, LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';

import { UserRepositoryAdapter } from './user-repository.adapter';

import { PrismaAdapter } from '../prisma/prisma.adapter';

@Module({
  providers: [
    {
      provide: TOKENS.UserRepositoryLogging,
      useFactory: (base: LoggerPort) =>
        base.withHandle(LoggerHandleEnum.REPOSITORY).withHandleName(UserRepositoryAdapter.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.UserRepositoryPort,
      useFactory: (logger: LoggerPort, prisma: PrismaAdapter) => new UserRepositoryAdapter(logger, prisma),
      inject: [TOKENS.UserRepositoryLogging, PrismaAdapter],
    },
  ],
  exports: [TOKENS.UserRepositoryPort],
})
export class UserRepositoryModule {}
