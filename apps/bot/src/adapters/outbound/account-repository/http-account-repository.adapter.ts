import { inject, injectable } from 'inversify';

import { Account, AccountFactory, AccountRepositoryPort, ConfigPort, IAccountProps, LoggerPort } from '@app/core';

import { TYPES } from '../../../types';

@injectable()
export class HttpAccountRepositoryAdapter implements AccountRepositoryPort {
  private readonly getAccountsUrl: string;
  private readonly getTopAccountsUrl: string;
  private readonly saveAccountUrl: string;

  public constructor(
    @inject(TYPES.LoggerPort) private readonly logger: LoggerPort,
    @inject(TYPES.ConfigPort) private readonly config: ConfigPort,
  ) {
    this.getAccountsUrl = config.get('GET_ACCOUNTS_URL');
    this.getTopAccountsUrl = config.get('GET_TOP_ACCOUNTS_URL');
    this.saveAccountUrl = config.get('SAVE_ACCOUNT_URL');
  }

  public async findByTelegramId(userTelegramId: number): Promise<Account[]> {
    const res = await fetch(`${this.getAccountsUrl}/${userTelegramId}`);

    const dtos: IAccountProps[] = await res.json();

    return dtos.map((dto: IAccountProps) => this.mapToDomain(dto));
  }

  public async findTopAccouns(): Promise<Account[]> {
    const res = await fetch(`${this.getTopAccountsUrl}`);

    const dtos: IAccountProps[] = await res.json();

    return dtos.map((dto: IAccountProps) => this.mapToDomain(dto));
  }

  public async save(account: Account): Promise<void> {}

  private mapToDomain(dto: IAccountProps): Account {
    return AccountFactory.persistenceAccount({
      accountId: dto.accountId,
      telegramId: dto.telegramId,
      platform: dto.platform,
      handle: dto.handle,
      externalId: dto.externalId,
      profileDisplayName: dto.profileDisplayName,
      syncedStatus: dto.syncedStatus,
      lastSyncedAt: dto.lastSyncedAt,
    });
  }
}
