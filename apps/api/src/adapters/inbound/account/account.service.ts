import { Inject, Injectable } from '@nestjs/common';

import { AddAccountUseCase, GetUserUseCase, LoggerPort } from '@app/core';

import { TOKENS } from '../../../tokens';
import { ParserApiPort } from '../../outbound/parser-api/parser-api.port';

@Injectable()
export class AccountService {
  public constructor(
    @Inject(TOKENS.AccountServiceLogging) private readonly logger: LoggerPort,
    @Inject(TOKENS.AddAccountUseCase) private readonly useCaseAccount: AddAccountUseCase,
    @Inject(TOKENS.GetUserUseCase) private readonly useCaseUser: GetUserUseCase,
    @Inject(TOKENS.ParserApiPort) private readonly api: ParserApiPort,
  ) {}

  public async searchAccount(input: { telegramId: string; handle: string; platform: string }): Promise<{ url: string }> {
    const { user } = await this.useCaseUser.execute({ telegramId: input.telegramId });

    const accountUrl = await this.api.searchAccount(input.handle, input.platform);

    return { url: accountUrl };
  }

  public async confirmAccount(input: { telegramId: string; handle: string; platform: string; url: string }): Promise<void> {}
}
