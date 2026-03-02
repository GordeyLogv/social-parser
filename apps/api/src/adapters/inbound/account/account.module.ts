import { Module } from '@nestjs/common';

import { AccountRepositoryPort, AddAccountUseCase, ClockPort, LoggerAppEnum, LoggerHandleEnum, LoggerPort } from '@app/core';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TOKENS } from '../../../tokens';

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: TOKENS.AccountControllerLogging,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.CONTROLLER).withHandleName(AccountController.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.AccountServiceLogging,
      useFactory: (base: LoggerPort) => base.withHandle(LoggerHandleEnum.SERVICE).withHandleName(AccountService.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.AddAccountUseCaseLogging,
      useFactory: (base: LoggerPort) =>
        base.withApp(LoggerAppEnum.CORE).withHandle(LoggerHandleEnum.USECASE).withHandleName(AddAccountUseCase.name),
      inject: [TOKENS.LoggerPort],
    },
    {
      provide: TOKENS.AddAccountUseCase,
      useFactory: (logger: LoggerPort, clock: ClockPort, repository: AccountRepositoryPort) =>
        new AddAccountUseCase(logger, clock, repository),
      inject: [TOKENS.AddAccountUseCaseLogging, TOKENS.ClockPort, TOKENS.AccountRepositoryPort],
    },
  ],
})
export class AccountModule {}
