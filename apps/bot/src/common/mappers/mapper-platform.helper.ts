import { AccountPlatformsEnum } from '@app/core';

const platformMap: Record<string, AccountPlatformsEnum> = {
  tiktok: AccountPlatformsEnum.TIKTOK,
  youtube: AccountPlatformsEnum.YOUTUBE,
};

export const mapperPlatform = (platform: string): AccountPlatformsEnum => {
  const mapped = platformMap[platform];

  if (!mapped) {
    throw new Error(`Unsupported platfrom, ${platform}`);
  }

  return mapped;
};
