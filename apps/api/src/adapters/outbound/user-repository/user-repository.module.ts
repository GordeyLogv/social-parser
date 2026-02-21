import { Module } from '@nestjs/common';

import { TOKENS } from '../../../composition';

import { UserRepositoryAdapter } from './user-repository.adapter';

@Module({
  providers: [
    {
      provide: TOKENS.UserRepositoryPort,
      useClass: UserRepositoryAdapter,
    },
  ],
  exports: [TOKENS.UserRepositoryPort],
})
export class UserRepositoryModule {}
