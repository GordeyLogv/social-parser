import { AccountPlatformEnum } from '@app/core';

export const platformsMapper = (platform: string): AccountPlatformEnum => {
  switch (platform) {
    case 'TikTok':
      return AccountPlatformEnum.TIKTOK;
    case 'Instagram':
      return AccountPlatformEnum.INSTAGRAM;
    case 'YouTube':
      return AccountPlatformEnum.YOUTUBE;
    default:
      throw new Error('Неверная платформа');
  }
};
