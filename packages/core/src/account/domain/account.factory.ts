import { AccountEntity } from './account.entity';
import { AccountSyncedStatusEnum, IAccountProps, IAccountPropsFactory } from './account.types';

export class AccountFactory {
  public static createNew(props: Omit<IAccountPropsFactory, 'syncedStatus'>): AccountEntity {
    return AccountEntity.createNew({ ...props, syncedStatus: AccountSyncedStatusEnum.IDLE });
  }

  public static fromPersistence(props: IAccountProps): AccountEntity {
    return AccountEntity.fromPersistence(props);
  }
}
