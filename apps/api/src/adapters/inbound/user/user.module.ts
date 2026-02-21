import { Module } from '@nestjs/common';

import { AddUserUseCase, ClockPort, LoggerPort, UserRepositoryPort } from '@app/core';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TOKENS } from '../../../composition';

import { UserRepositoryModule } from '../../outbound';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: TOKENS.AddUserUseCase,
      useFactory: (logger: LoggerPort, userRepository: UserRepositoryPort, clock: ClockPort) =>
        new AddUserUseCase(logger, userRepository, clock),
      inject: [TOKENS.LoggerPort, TOKENS.UserRepositoryPort, TOKENS.ClockPort],
    },
  ],
})
export class UserModule {}
