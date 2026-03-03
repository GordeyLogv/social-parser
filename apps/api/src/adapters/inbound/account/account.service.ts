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
    this.logger.info('Пользователь ищет аккаунт', { telegramId: input.telegramId });

    const url = await this.api.searchAccount(input.handle, input.platform);

    this.logger.info('Найденный аккаунт', { account: url });

    return { url };
  }

  public async confirmAccount(input: { telegramId: string; handle: string; platform: string; url: string }): Promise<void> {
    this.logger.info('Пользователь подтверждает аккаунт', { telegramId: input.telegramId, account: input.url });

    const checkExistsUser = await this.useCaseUser.execute({ telegramId: input.telegramId });

    const userProps = checkExistsUser.user.toPrimitives();

    await this.useCaseAccount.execute({
      userId: userProps.id,
      platform: input.platform,
      handle: input.handle,
      url: input.url,
    });
  }
}
