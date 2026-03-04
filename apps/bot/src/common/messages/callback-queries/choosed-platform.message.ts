import { AccountPlatformsEnum } from '@app/core';

export const choosedPlatformMessage = (platform: AccountPlatformsEnum) => {
  return `Let's add your account to ${platform}, just write your nickname examle @_Example_123`;
};
