import { Module } from '@nestjs/common';

import { TOKENS } from '../../../composition';

import { UserRepositoryAdapter } from './user-repository.adapter';

import { LoggerPort } from '@app/core';

@Module({
  providers: [
    {
      provide: TOKENS.UserRepositoryPort,
      useFactory: (logger: LoggerPort) => new UserRepositoryAdapter(logger, ),
      inject: [TOKENS.LoggerPort],
    },
  ],
  exports: [TOKENS.UserRepositoryPort],
})
export class UserRepositoryModule {}
