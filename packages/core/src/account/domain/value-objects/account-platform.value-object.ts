import { AccountPlatformsEnum } from '../account.types';

import { AccountInvalidPlatformError, AccountNotSupportedPlatformError } from '../errors/platform';

export class AccountPlatformVO {
  private readonly _platform: AccountPlatformsEnum;

  private constructor(platform: AccountPlatformsEnum) {
    this._platform = platform;
  }

  private static PLATFORM_MAP: Record<string, AccountPlatformsEnum> = {
    tiktok: AccountPlatformsEnum.TIKTOK,
    instagram: AccountPlatformsEnum.INSTAGRAM,
    youtube: AccountPlatformsEnum.YOUTUBE,
  };

  public static create(raw: string): AccountPlatformVO {
    const trimed = raw.trim().toLowerCase();

    if (!trimed || trimed.length == 0) {
      throw new AccountInvalidPlatformError();
    }

    const platform = this.PLATFORM_MAP[trimed];

    if (!platform) {
      throw new AccountNotSupportedPlatformError();
    }

    return new AccountPlatformVO(platform);
  }

  public get platform(): AccountPlatformsEnum {
    return this._platform;
  }

  public get displayPlatform(): string {
    return this._platform;
  }
}
