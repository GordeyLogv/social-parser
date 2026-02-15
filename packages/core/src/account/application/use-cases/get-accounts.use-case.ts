import { LoggerPort } from '@shared';

import { GetAccountsInput, GetAccountsOutput } from '../../contracts/commands/get-accounts';

import { AccountRepositoryPort } from '../ports';

import { GetAccountsLoggingMessages } from '../messages/use-cases/get-accounts';

import { NotFoundAccountsError } from '../errors/get-accounts';

export class GetAccountsUseCase {
  public constructor(
    private readonly logger: LoggerPort,
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  public async execute(input: GetAccountsInput): Promise<GetAccountsOutput> {
    this.logger.info(GetAccountsLoggingMessages.START, { userTelegramId: input.userTelegramId });

    const accounts = await this.accountRepository.findByTelegramId(input.userTelegramId);

    if (accounts.length == 0) {
      this.logger.warn(GetAccountsLoggingMessages.FAILED, { userTelegramId: input.userTelegramId });
      throw new NotFoundAccountsError();
    }

    this.logger.info(GetAccountsLoggingMessages.FINISH, { userTelegramId: input.userTelegramId, accounts: accounts });
    return { accounts };
  }
}
