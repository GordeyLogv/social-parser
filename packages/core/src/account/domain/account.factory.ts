import { Account } from './account.entity';

import { AccountSyncedStatusEnum, IAccountProps } from './account.types';

export class AccountFactory {
  public static newAccount(props: Pick<IAccountProps, 'telegramId' | 'handle' | 'platform'>): Account {
    return Account.create({
      ...props,
      syncedStatus: AccountSyncedStatusEnum.IDLE,
    });
  }

  public static persistenceAccount(props: IAccountProps): Account {
    return Account.persistence(props);
  }
}
