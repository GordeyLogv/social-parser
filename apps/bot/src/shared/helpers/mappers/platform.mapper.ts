import { PlatformsEnum } from '../../../adapters/inbound';

export const platformsMapper = (platform: string): PlatformsEnum => {
  switch (platform) {
    case 'TikTok':
      return PlatformsEnum.TIKTOK;
    case 'Instagram':
      return PlatformsEnum.INSTAGRAM;
    case 'YouTube':
      return PlatformsEnum.YOUTUBE;
    default:
      const never = platform as PlatformsEnum;
      return never;
  }
};
