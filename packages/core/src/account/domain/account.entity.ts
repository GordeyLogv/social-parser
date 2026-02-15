import { AccountPlatformEnum, AccountSyncedStatusEnum, IAccountProps } from './account.types';

import { AccountNamePolicy } from './policies';

export class Account {
  private accountId?: string;
  private telegramId: number;
  private readonly platform: AccountPlatformEnum;

  private readonly handle: string;
  private externalId?: string;
  private profileDisplayName?: string;

  private syncedStatus?: AccountSyncedStatusEnum;
  private lastSyncedAt?: Date;

  private constructor(props: IAccountProps) {
    this.accountId = props.accountId;
    this.telegramId = props.telegramId;
    this.platform = props.platform;

    this.handle = props.handle;
    this.externalId = props.externalId;
    this.profileDisplayName = props.profileDisplayName;

    this.syncedStatus = props.syncedStatus;
    this.lastSyncedAt = props.lastSyncedAt;
  }

  public static create(props: IAccountProps): Account {
    AccountNamePolicy.validate(props.handle);
    return new Account(props);
  }

  public static persistence(props: IAccountProps): Account {
    return new Account(props);
  }

  public attachExternalId(externalId: string): void {
    this.externalId = externalId;
  }

  public attachDisplayName(displayName: string): void {
    this.profileDisplayName = displayName;
  }

  public markRunning(): void {
    this.syncedStatus = AccountSyncedStatusEnum.RUNNING;
  }

  public markSunced(date: Date): void {
    this.syncedStatus = AccountSyncedStatusEnum.IDLE;
    this.lastSyncedAt = date;
  }

  public markFailed(): void {
    this.syncedStatus = AccountSyncedStatusEnum.FAILED;
  }
}
