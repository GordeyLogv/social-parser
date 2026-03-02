import { Inject, Injectable } from '@nestjs/common';

import { AddAccountUseCase, LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';

@Injectable()
export class AccountService {
  public constructor(
    @Inject(TOKENS.AccountServiceLogging) private readonly logger: LoggerPort,
    @Inject(TOKENS.AddAccountUseCase) private readonly useCase: AddAccountUseCase,
  ) {}

  public async searchAccount() {}

  public async confirmAccount() {}
}
