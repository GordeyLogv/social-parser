import { Inject, Injectable } from '@nestjs/common';

import { AddAccountUseCase, GetUserUseCase, LoggerPort } from '@app/core';
import { SearchAccountResponse } from '@app/contracts';

import { TOKENS } from '../../../tokens';
import { ParserApiPort } from '../../outbound/parser-api/parser-api.port';
import { SearchAccountType } from '../../../common';

@Injectable()
export class AccountService {
  public constructor(
    @Inject(TOKENS.AccountServiceLogging) private readonly logger: LoggerPort,
    @Inject(TOKENS.AddAccountUseCase) private readonly useCaseAccount: AddAccountUseCase,
    @Inject(TOKENS.GetUserUseCase) private readonly useCaseUser: GetUserUseCase,
    @Inject(TOKENS.ParserApiPort) private readonly api: ParserApiPort,
  ) {}

  public async searchAccount(input: SearchAccountType): Promise<SearchAccountResponse> {
    this.logger.info(`User finding account`, { input });

    const findedAccount = await this.api.searchAccount(input.handle, input.platform);

    this.logger.info('Found account', { account: findedAccount });

    return findedAccount;
  }

  public async confirmAccount(input: SearchAccountType, url: string): Promise<void> {
    this.logger.info(`User: ${input.telegramId} confirned account`, {
      handle: input.handle,
      platform: input.platform,
      url: url,
    });

    const checkExistsUser = await this.useCaseUser.execute({ telegramId: input.telegramId });

    this.logger.info(`User: ${input.telegramId} - exists`);

    const userProps = checkExistsUser.user.toPrimitives();

    await this.useCaseAccount.execute({
      userId: userProps.id,
      platform: input.platform,
      handle: input.handle,
      url: input.url,
    });

    this.logger.info('User saved account', {
      userId: userProps.id,
      telegramId: userProps.telegramId,
      url: input.url,
    });
  }
}
