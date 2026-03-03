import { IAccountProps, AccountSyncedStatusEnum, IAccountPropsFactory, IAccountToPrimitives } from './account.types';

import { AccountHandleVO, AccountPlatformVO } from './value-objects';

export class AccountEntity {
  private readonly _id?: number;
  private readonly _userId: number;
  private readonly _platform: AccountPlatformVO;
  private readonly _handle: AccountHandleVO;
  private readonly _url: string;
  private readonly _syncedStatus: AccountSyncedStatusEnum;
  private readonly _lastSyncedAt?: Date;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  private constructor(props: IAccountProps) {
    this._id = props.id;
    this._userId = props.userId;
    this._platform = props.platform;
    this._handle = props.handle;
    this._url = props.url;
    this._syncedStatus = props.syncedStatus;
    this._lastSyncedAt = props.lastSyncedAt;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public static createNew(props: IAccountPropsFactory): AccountEntity {
    return new AccountEntity({
      userId: props.userId,
      platform: AccountPlatformVO.create(props.platform),
      handle: AccountHandleVO.create(props.handle),
      url: props.url,
      syncedStatus: props.syncedStatus,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  public static fromPersistence(props: IAccountProps): AccountEntity {
    return new AccountEntity(props);
  }

  public toProps(): IAccountProps {
    return {
      id: this._id,
      userId: this._userId,
      platform: this._platform,
      handle: this._handle,
      url: this._url,
      syncedStatus: this._syncedStatus,
      lastSyncedAt: this._lastSyncedAt,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  public toPrimitives(): IAccountToPrimitives {
    return {
      id: this._id,
      userId: this._userId,
      platform: this._platform.displayPlatform,
      handle: this._handle.displayName,
      url: this._url,
      syncedStatus: this._syncedStatus,
      lastSyncedAt: this._lastSyncedAt,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
