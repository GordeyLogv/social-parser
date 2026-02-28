import { Inject, Injectable } from '@nestjs/common';

import { AddUserUseCase, LoggerPort } from '@app/core';
import { TOKENS } from '../../../tokens';

@Injectable()
export class UserService {
  public constructor(
    @Inject(TOKENS.UserServiceLogging) private readonly logger: LoggerPort,
    @Inject(TOKENS.AddUserUseCase) private readonly useCase: AddUserUseCase,
  ) {}

  public async addUser(telegramId: string, firstName?: string): Promise<void> {
    this.logger.info('start');
    await this.useCase.execute({ telegramId, firstName });
  }
}
