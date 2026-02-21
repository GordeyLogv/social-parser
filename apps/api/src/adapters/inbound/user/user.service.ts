import { Inject, Injectable } from '@nestjs/common';

import { AddUserUseCase, LoggerPort } from '@app/core';

import { TOKENS } from '../../../composition';

@Injectable()
export class UserService {
  public constructor(
    @Inject(TOKENS.LoggerPort) private readonly logger: LoggerPort,
    @Inject(TOKENS.AddUserUseCase) private readonly useCase: AddUserUseCase,
  ) {}

  public async addUser(telegramId: bigint, firstName: string) {
    await this.useCase.execute({ telegramId, firstName });
  }
}
