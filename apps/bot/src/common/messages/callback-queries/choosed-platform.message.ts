import { AccountPlatformsEnum } from '@app/core';

export const choosedPlatformMessage = (platform: AccountPlatformsEnum) => {
  return `Давай добавим твой аккаунт в ${platform}, просто введи свой никнейм пример @_Example_123`;
};
