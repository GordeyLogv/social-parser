import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserRepositoryModule } from '../../outbound';
import { TOKENS } from '../../../tokens';
import { UserService } from './user.service';
import { AddUserUseCase, ClockPort, LoggerAppEnum, LoggerHandleEnum, LoggerPort, UserRepositoryPort } from '@app/core';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: TOKENS.UserControllerLogging,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.CONTROLLER).withHandleName(UserController.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.UserServiceLogging,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.SERVICE).withHandleName(UserService.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.AddUserUseCaseLogging,
      useFactory: (base: LoggerPort) =>
        base.withApp(LoggerAppEnum.CORE).withHandle(LoggerHandleEnum.USECASE).withHandleName(AddUserUseCase.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.AddUserUseCase,
      useFactory: (logger: LoggerPort, repository: UserRepositoryPort, clock: ClockPort) =>
        new AddUserUseCase(logger, repository, clock),
      inject: [TOKENS.AddUserUseCaseLogging, TOKENS.UserRepositoryPort, TOKENS.ClockPort],
    },
  ],
})
export class UserModule {}
